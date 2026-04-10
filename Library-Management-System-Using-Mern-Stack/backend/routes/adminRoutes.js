import express from 'express';
import {
    getStats,
    createBook,
    updateBook,
    deleteBook,
    getUsers,
    blockUser,
    deleteUser,
    getAllBorrows,
    updateBorrowStatus
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getStats);
router.get('/users', protect, admin, getUsers);
router.put('/users/:id/block', protect, admin, blockUser);
router.delete('/users/:id', protect, admin, deleteUser);

router.post('/books', protect, admin, createBook);
router.put('/books/:id', protect, admin, updateBook);
router.delete('/books/:id', protect, admin, deleteBook);

router.get('/borrows', protect, admin, getAllBorrows);
router.put('/borrows/:id', protect, admin, updateBorrowStatus);

export default router;
