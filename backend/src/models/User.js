const { default: mongoose } = require("mongoose");

// UserSchema ---
// User login and signup ---
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type:String,
            enum:["admin", "user"],
            default:"user"
        }
    },
    { timestamps: true }
);


// exports ---
module.exports = mongoose.model("User" , userSchema);