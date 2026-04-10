import mongoose from 'mongoose';

const borrowSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Returned'],
        default: 'Pending'
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    }
}, {
    timestamps: true
});

const Borrow = mongoose.model('Borrow', borrowSchema);
export default Borrow;
