import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import Borrow from './models/Borrow.js';

dotenv.config();

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Classic',
        description: 'A story of wealth, love, and the American Dream in the 1920s.',
        imageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
        totalQuantity: 5,
        availableQuantity: 5
    },
    {
        title: '1984',
        author: 'George Orwell',
        category: 'Dystopian',
        description: 'A chilling prophecy about the future and the dangers of totalitarianism.',
        imageUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
        totalQuantity: 8,
        availableQuantity: 8
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Classic',
        description: 'A powerful story of racial injustice and the loss of innocence in the American South.',
        imageUrl: 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg',
        totalQuantity: 6,
        availableQuantity: 6
    },
    {
        title: 'Educated',
        author: 'Tara Westover',
        category: 'Memoir',
        description: 'A woman escapes her survivalist family to pursue an education.',
        imageUrl: 'https://m.media-amazon.com/images/I/81WojUxbbFL._AC_UF1000,1000_QL80_.jpg',
        totalQuantity: 7,
        availableQuantity: 7
    },
    {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        category: 'History',
        description: 'A brief history of humankind.',
        imageUrl: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg',
        totalQuantity: 11,
        availableQuantity: 11
    },
    {
        title: 'Circe',
        author: 'Madeline Miller',
        category: 'Mythology',
        description: 'The story of the sorceress Circe from the Odyssey.',
        imageUrl: 'https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg',
        totalQuantity: 4,
        availableQuantity: 4
    },
    {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        category: 'Finance',
        description: 'What the rich teach their kids about money that the poor and middle class do not!',
        imageUrl: 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
        totalQuantity: 10,
        availableQuantity: 10
    },
    {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        category: 'Business',
        description: 'How Today\'s Entrepreneurs Use Continuous Innovation.',
        imageUrl: 'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
        totalQuantity: 11,
        availableQuantity: 11
    },
    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        category: 'Biography',
        description: 'The exclusive biography of Steve Jobs.',
        imageUrl: 'https://m.media-amazon.com/images/I/41dKkez-1rL._SX326_BO1,204,203,200_.jpg',
        totalQuantity: 10,
        availableQuantity: 10
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing books and borrows to prevent orphaned data
        await Book.deleteMany({});
        await Borrow.deleteMany({});
        console.log('Existing books and borrows cleared.');

        // Add new books
        await Book.insertMany(books);
        console.log('Database seeded with new books!');

        process.exit();
    } catch (error) {
        console.error(`Error seeding database: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
