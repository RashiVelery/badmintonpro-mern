const { default: mongoose } = require("mongoose");


const registrationSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        playerName: { type: String },

        phone: { type: String },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },

        paymentId: {
            type: String, required: false
        },

        paymentStatus: {
            type: String, default: 'pending'
        }
    },
    { timestamps: true }
);




module.exports = mongoose.model('Registration', registrationSchema)