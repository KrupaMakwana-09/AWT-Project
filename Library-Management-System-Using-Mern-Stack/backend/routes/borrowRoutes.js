import express from 'express';
import { requestBorrow, getMyBorrows, returnBook } from '../controllers/borrowController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, requestBorrow);
router.get('/myborrows', protect, getMyBorrows);
router.put('/:id/return', protect, returnBook);

export default router;
