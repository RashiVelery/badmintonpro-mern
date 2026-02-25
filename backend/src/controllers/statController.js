const Match = require("../models/Match");

const getParticipantStats = async (req, res) => {
  try {
    const { tournamentId, playerName } = req.params;

    const matches = await Match.find({
      tournament: tournamentId,
      $or: [
        { "teams.teamA": playerName },
        { "teams.teamB": playerName }
      ]
    });

    let matchesPlayed = matches.length;
    let wins = 0;
    let losses = 0;
    let totalPointsScored = 0;
    let totalPointsConceded = 0;

    matches.forEach(match => {

      const isTeamA = match.teams.teamA === playerName;

      const scored = isTeamA ? match.score.teamA : match.score.teamB;
      const conceded = isTeamA ? match.score.teamB : match.score.teamA;

      totalPointsScored += scored;
      totalPointsConceded += conceded;

      if (match.winner === playerName) {
        wins++;
      } else if (match.status === "finished") {
        losses++;
      }
    });

    const winPercentage =
      matchesPlayed > 0 ? ((wins / matchesPlayed) * 100).toFixed(2) : 0;

    res.json({
      matchesPlayed,
      wins,
      losses,
      totalPointsScored,
      totalPointsConceded,
      winPercentage: `${winPercentage}%`
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getParticipantStats };