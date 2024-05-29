const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, gender, dateOfBirth, email, password } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.gender = gender;
        user.dateOfBirth = dateOfBirth;
        user.email = email;

        await user.save();
        res.json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'Account deleted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (req.file) {
            user.profileImage = req.file.path;
            await user.save();
        }

        res.json({ message: 'Profile image uploaded successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getProfile, updateProfile, deleteAccount, uploadProfileImage };
