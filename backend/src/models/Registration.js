const { default: mongoose } = require("mongoose");


const registrationSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            require: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },

        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {timestamps: true}
);




module.exports = mongoose.model('Registration', registrationSchema)