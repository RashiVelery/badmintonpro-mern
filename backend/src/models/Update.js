const { default: mongoose } = require("mongoose");


const updateSchema = new mongoose.Schema(
    {
        tournament: ObjectId,

        teams: {
            teamA: ObjectId,
            teamB: ObjectId
        },
        rules: {
            pointsPerGame: 21,
            bestOf: 3,
            intervel: {
                enabled: true, at: 11
            },
            deuceEnabled: true
        },

        currentGame: 1,

        score: {
            teamA: 0,
            teamB: 0
        },

        gamesWon: {
            teamA: 0,
            teamB: 0
        },

        status: "Ongoing"
    });



    module.exports = mongoose.model('Update' ,updateSchema);
    