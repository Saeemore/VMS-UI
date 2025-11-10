// FILE: controllers/auth.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMe = async (req, res) => {
    res.json(req.user);
};


exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide current and new passwords.' });
    }

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }

        user.password_hash = newPassword;
        await user.save(); // The pre-save hook will hash the new password

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};