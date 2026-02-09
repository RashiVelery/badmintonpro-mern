const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Signup ---
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    // Check the user already exist ---
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({
            message: "User already exist"
        });
    }

    // Hashed password ---
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Register new user ---
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(200).json({
        message: 'User registration successfully'
    });
}

// Login ---
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check the user already login ---
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    // Compare the password is match ---
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    // Create token ---
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // Token stored in cookies ---
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    });

    res.json({ message: "Login successfull" });
};

// Logout ---
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
}

// Exports the controllers ---
module.exports = {
    signup,
    login,
    logout
}