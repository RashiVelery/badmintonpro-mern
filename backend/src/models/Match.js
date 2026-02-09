const { default: mongoose } = require("mongoose");


const matchSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        teams: {
            teamA: String,   // or ObjectId (Player/Team)
            teamB: String
        },

        score: {
            teamA: { type: Number, default: 0 },
            teamB: { type: Number, default: 0 }
        },

        gamesWon: {
            teamA: { type: Number, default: 0 },
            teamB: { type: Number, default: 0 }
        },

        currentGame: {
            type: Number,
            default: 1
        },

        rules: {
            pointsPerGame: { type: Number, default: 21 },
            bestOf: { type: Number, default: 3 },
            interval: {
                enabled: { type: Boolean, default: true },
                at: { type: Number, default: 11 }
            },
            deuceEnabled: { type: Boolean, default: true }
        },

        status: {
            type: String,
            enum: ["ongoing", "interval", "finished"],
            default: "ongoing"
        },

        winner: {
            type: String,
            default: null
        },

        intervalTaken: {
            type: Boolean,
            default: false
        },
        
        // For undo ---
        scoreHistory: [
            {
                team: {
                    type: String,
                    enum: ["teamA", "teamB"]
                },
                game: Number
            }
        ],

        // For redo ---
        redoStack: [
            {
                team: {
                    type: String,
                    enum: ["teamA", "teamB"]
                },
                game: Number
            }
        ]
    }, { timestamps: true }
);



module.exports = mongoose.model("Match", matchSchema)