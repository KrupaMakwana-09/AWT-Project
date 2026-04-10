import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';
import { getIo } from '../socket/socket.js';

// @desc    Request to borrow a book
// @route   POST /api/borrows
// @access  Private
export const requestBorrow = async (req, res) => {
    try {
        const { bookId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableQuantity <= 0) {
            return res.status(400).json({ message: 'Book is out of stock' });
        }

        // Check if user already has an active borrow request for this book
        const existingBorrow = await Borrow.findOne({
            user: req.user._id,
            book: bookId,
            status: { $in: ['Pending', 'Approved'] }
        });

        if (existingBorrow) {
            return res.status(400).json({ message: 'You have already requested or borrowed this book' });
        }

        const borrow = await Borrow.create({
            user: req.user._id,
            book: bookId,
        });

        const createdBorrow = await borrow.populate('user book');
        
        // Emitting socket event
        getIo().emit('borrowRequest', createdBorrow);

        res.status(201).json(createdBorrow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's borrowed books & history
// @route   GET /api/borrows/myborrows
// @access  Private
export const getMyBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find({ user: req.user._id })
            .populate('book')
            .sort({ createdAt: -1 });

        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Return a book
// @route   PUT /api/borrows/:id/return
// @access  Private
export const returnBook = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id);

        if (borrow) {
            if (borrow.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            if (borrow.status !== 'Approved') {
                return res.status(400).json({ message: 'Book not approved for return or already returned' });
            }

            borrow.status = 'Returned';
            borrow.returnDate = new Date();
            await borrow.save();

            const book = await Book.findById(borrow.book);
            book.availableQuantity += 1;
            await book.save();

            const updatedBorrow = await Borrow.findById(req.params.id).populate('user book');

            getIo().emit('bookReturned', updatedBorrow);

            res.json(updatedBorrow);
        } else {
            res.status(404).json({ message: 'Borrow request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
