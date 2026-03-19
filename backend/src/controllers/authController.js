const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendLoginEmail = require('../utils/sendEmail.js');


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
        password: hashedPassword,
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
            field: "email",
            message: "Email not registered"
        });
    }

    // Compare the password is match ---
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            field: "password",
            message: "Incorrect password"
        });
    }

    if (user.isActive === false) {
        return res.status(403).json({
            field: "email",
            message: "Your account has been disabled please contact admin..."
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
        sameSite: "none",
        secure: true,
    });

    sendLoginEmail(user.email, user.name);

    res.json({ message: "Login successfull" });
};

// Logout ---
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
}

const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isActive = !user.isActive;

        // ഡാറ്റാബേസിൽ സേവ് ചെയ്യുന്നു (ഇതാണ് പ്രധാനം!)
        await user.save();

        res.status(200).json({
            message: `User ${user.isActive ? 'Enabled' : 'Disabled'} successfully`,
            isActive: user.isActive
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Exports the controllers ---
module.exports = {
    signup,
    login,
    logout,
    toggleUserStatus
}