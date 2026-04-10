import User from '../models/User.js';
import Borrow from '../models/Borrow.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const totalBorrowed = await Borrow.countDocuments({ user: user._id, status: 'Approved' });
            const totalReturned = await Borrow.countDocuments({ user: user._id, status: 'Returned' });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                stats: {
                    borrowed: totalBorrowed,
                    returned: totalReturned
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            const totalBorrowed = await Borrow.countDocuments({ user: user._id, status: 'Approved' });
            const totalReturned = await Borrow.countDocuments({ user: user._id, status: 'Returned' });

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                stats: {
                    borrowed: totalBorrowed,
                    returned: totalReturned
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
