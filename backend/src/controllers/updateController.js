const Match = require("../models/Match");


// Add point Login ---
const addPoint = (match, scoringTeam) => {
    const { rules } = match;

    // Save history (for undo)
    match.scoreHistory.push({
        team: scoringTeam,
        game: match.currentGame
    });

    // Clear redo stack (new action invalidates redo)
    match.redoStack = [];

    // Increment score
    match.score[scoringTeam] += 1;

    const a = match.score.teamA;
    const b = match.score.teamB;

    // Interval check
    if (
        rules.interval.enabled &&
        !match.intervalTaken &&
        (a === rules.interval.at || b === rules.interval.at)
    ) {
        match.status = "interval";
        match.intervalTaken = true;
        return match;
    }

    // Game win check 
    if (isGameWon(a, b, rules)) {
        finishGame(match, scoringTeam);
    }

    return match;
};

// Game Won Logic ---
const isGameWon = (a, b, rules) => {
    // Deuce enabled
    if (rules.deuceEnabled && a >= 20 && b >= 20) {
        if (Math.abs(a - b) >= 2) return true;
        if (a === 30 || b === 30) return true;
        return false;
    }

    // Normal win
    return a >= rules.pointsPerGame || b >= rules.pointsPerGame;
};


// Finish Game ---
const finishGame = (match, winnerTeam) => {

    // Increase game count
    match.gamesWon[winnerTeam] += 1;

    // Reset score & interval
    match.score.teamA = 0;
    match.score.teamB = 0;
    match.intervalTaken = false;

    const gamesToWin = Math.ceil(match.rules.bestOf / 2);

    // Match finished
    if (match.gamesWon[winnerTeam] === gamesToWin) {
        match.status = "finished";
        match.winner = winnerTeam;
    } else {
        match.currentGame += 1;
        match.status = "ongoing";
    }
};

// Add score ---
const addScore = async (req, res) => {
    try {
        const { team } = req.body;

        if (!["teamA", "teamB"].includes(team)) {
            return res.status(400).json({ message: "Invalid team" });
        }

        const match = await Match.findById(req.params.id);

        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }

        if (match.status === "finished") {
            return res.status(400).json({ message: "Match already finished" });
        }

        if (match.status === "interval") {
            return res
                .status(400)
                .json({ message: "Match is in interval. Resume to continue." });
        }

        const updatedMatch = addPoint(match, team);
        await updatedMatch.save();

        res.json(updatedMatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Resume match ---
const resumeMatch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);

        if (!match) {
            return res.status(404).json({ message: "Match not found" });
        }

        if (match.status !== "interval") {
            return res.status(400).json({ message: "Match is not in interval" });
        }

        match.status = "ongoing";
        await match.save();

        res.json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const undoScore = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match || match.scoreHistory.length === 0) {
      return res.status(400).json({ message: "Nothing to undo" });
    }

    const lastAction = match.scoreHistory.pop();

    // Save for redo
    match.redoStack.push(lastAction);

    // Revert score
    match.score[lastAction.team] -= 1;

    // Restore status if needed
    if (match.status === "interval") {
      match.status = "ongoing";
      match.intervalTaken = false;
    }

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const redoScore = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match || match.redoStack.length === 0) {
      return res.status(400).json({ message: "Nothing to redo" });
    }

    const action = match.redoStack.pop();

    // Re-apply score
    match.score[action.team] += 1;

    // Save back to history
    match.scoreHistory.push(action);

    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Exports ---
module.exports = {
    addScore,
    resumeMatch,
    undoScore,
    redoScore
};
