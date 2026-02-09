// Admin Schema ---
// What admin can edit ---
const { default: mongoose } = require("mongoose");

// adminSchema ---
const adminSchema = new mongoose.Schema(
    {
        tournamentName: {
            type: String,
            required: true
        },
        tournamentType: {
            type: String,
            enum: ["Knockout", "League", "Round Robin"],
            required: true
        },
        category: {
            type: String,
            enum: ["Singles", "Doubles", "Mixed Doubles"],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        venue: {
            type: String,
            required: true
        },
        courts: [
            {
                courtNumber: Number,
                status: {
                    type: String,
                    enum: ["available", "occupied"],
                    default: "available"
                }
            }
        ],
        maxPlayers: {
            type: Number,
            required: true
        },
        rules: {
            pointsPerGame: {
                type: Number,
                default: 21
            },
            bestOf: {
                type: Number,
                default: 3
            },
            interval: {
                enabled: {
                    type: Boolean,
                    default: true
                },
                at: {
                    type: Number,
                    default: 11
                }
            },
            deuceEnabled: {
                type: Boolean,
                default: true
            },
            maxPoints: {
                type: Number,
                default: 30
            },
            scoringType: {
                type: String,
                enum: ["rally"],
                default: "rally"
            }
        }

    });


// exports ---
module.exports = mongoose.model("Admin", adminSchema);