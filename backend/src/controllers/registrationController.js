const Registration = require("../models/Registration");
const Tournament = require("../models/Tournament");

const registerForTournament = async (req, res) => {
  const { tournamentId } = req.body;
  const userId = req.user.id; // from auth middleware

  // get tournament 
  const tournament = await Tournament.findById(tournamentId);

  if (!tournament) {
    return res.status(404).json({ message: "Tournament not found" });
  };

  // only published tournaments allow registration
  if (tournament.status !== "published") {
    return res.status(400).json({
      message: "Tournament is not open for registration"
    })
  }



  // Prevent duplicate registration
  const existing = await Registration.findOne({
    tournament: tournamentId,
    user: userId
  });


  if (existing) {
    return res.status(400).json({ message: "Already registered" });
  }

  // check slotes 
  const registeredCount = await Registration.countDocuments({
    tournament: tournamentId,
    status: { $ne: "rejected" }
  })

  if (registeredCount >= tournament.slots) {
    return res.status(400).json({
      message: "Tournament slots are full"
    })
  }

  // register for tournament
  const registration = await Registration.create({
    tournament: tournamentId,
    user: userId,
    status: 'pending'
  });

  res.status(201).json(registration);
};


const getTournamentRegistrations = async (req, res) => {
  const { tournamentId } = req.params;

  const registrations = await Registration.find({ tournament: tournamentId })
    .populate("user", "name email")
    .populate("tournament", "name");

  res.json(registrations);
};


const updateRegistrationStatus = async (req, res) => {
  const { status } = req.body; // approved | rejected

  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }

  registration.status = status;
  await registration.save();

  res.json(registration);
};




module.exports = {
  updateRegistrationStatus,
  registerForTournament,
  getTournamentRegistrations
};