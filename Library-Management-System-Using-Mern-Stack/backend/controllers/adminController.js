import Book from '../models/Book.js';
import User from '../models/User.js';
import Borrow from '../models/Borrow.js';
import { getIo } from '../socket/socket.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalBorrows = await Borrow.countDocuments();
        const activeBorrows = await Borrow.countDocuments({ status: 'Approved' });

        res.json({
            totalBooks,
            totalUsers,
            totalBorrows,
            activeBorrows
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a book
// @route   POST /api/admin/books
// @access  Private/Admin
export const createBook = async (req, res) => {
    try {
        const { title, author, category, description, imageUrl, totalQuantity } = req.body;

        const book = new Book({
            title,
            author,
            category,
            description,
            imageUrl,
            totalQuantity,
            availableQuantity: totalQuantity
        });

        const createdBook = await book.save();
        
        getIo().emit('newBookAdded', createdBook);

        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a book
// @route   PUT /api/admin/books/:id
// @access  Private/Admin
export const updateBook = async (req, res) => {
    try {
        const { title, author, category, description, imageUrl, totalQuantity } = req.body;

        const book = await Book.findById(req.params.id);

        if (book) {
            // Calculate available quantity based on change in total quantity
            const diff = totalQuantity - book.totalQuantity;
            
            book.title = title || book.title;
            book.author = author || book.author;
            book.category = category || book.category;
            book.description = description || book.description;
            book.imageUrl = imageUrl || book.imageUrl;
            book.totalQuantity = totalQuantity || book.totalQuantity;
            book.availableQuantity = book.availableQuantity + diff; // May need better logic depending on currently borrowed books

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a book
// @route   DELETE /api/admin/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Delete/Block user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
export const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isBlocked = !user.isBlocked; // Toggle block status
            await user.save();
            res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete  user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: `User removed` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all borrow requests (pending, approved, returned)
// @route   GET /api/admin/borrows
// @access  Private/Admin
export const getAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find()
            .populate('user', 'name email')
            .populate('book', 'title author imageUrl')
            .sort({ createdAt: -1 });
            
        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve or reject a borrow request
// @route   PUT /api/admin/borrows/:id
// @access  Private/Admin
export const updateBorrowStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const borrow = await Borrow.findById(req.params.id);

        if (!borrow) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        const book = await Book.findById(borrow.book);
        
        if (status === 'Approved') {
            if (book.availableQuantity <= 0) {
                 return res.status(400).json({ message: 'Book is out of stock' });
            }
            borrow.status = 'Approved';
            borrow.borrowDate = new Date();
            book.availableQuantity -= 1;
            await book.save();
        } else if (status === 'Rejected') {
            borrow.status = 'Rejected';
        } else if (status === 'Returned') {
             borrow.status = 'Returned';
             borrow.returnDate = new Date();
             book.availableQuantity += 1;
             await book.save();
        }

        await borrow.save();

        const updatedBorrow = await Borrow.findById(req.params.id).populate('user book');
        
        if(status === 'Approved') {
            getIo().emit('borrowApproved', updatedBorrow);
        } else if (status === 'Rejected') {
            // maybe emit reject event if needed
        }

        res.json(updatedBorrow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
