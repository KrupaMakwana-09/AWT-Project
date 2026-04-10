import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Book from '../models/Book.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Book.deleteMany();

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
        });

        console.log('Admin user created successfully!');

        // Create Sample Books
        const books = [
            {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                category: 'Technology',
                description: 'A Handbook of Agile Software Craftsmanship.',
                imageUrl: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg',
                totalQuantity: 10,
                availableQuantity: 10,
            },
            {
                title: 'The Psychology of Money',
                author: 'Morgan Housel',
                category: 'Finance',
                description: 'Timeless lessons on wealth, greed, and happiness.',
                imageUrl: 'https://m.media-amazon.com/images/I/41r6F2LRf8L._SX324_BO1,204,203,200_.jpg',
                totalQuantity: 15,
                availableQuantity: 15,
            },
            {
                title: 'Deep Work',
                author: 'Cal Newport',
                category: 'Productivity',
                description: 'Rules for Focused Success in a Distracted World.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg',
                totalQuantity: 8,
                availableQuantity: 8,
            },
            {
                title: 'Atomic Habits',
                author: 'James Clear',
                category: 'Self-Help',
                description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
                imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg',
                totalQuantity: 12,
                availableQuantity: 12,
            },
            {
                title: 'Thinking, Fast and Slow',
                author: 'Daniel Kahneman',
                category: 'Psychology',
                description: 'Explores the two systems that drive the way we think.',
                imageUrl: 'https://m.media-amazon.com/images/I/41sh6r262FL._SX323_BO1,204,203,200_.jpg',
                totalQuantity: 6,
                availableQuantity: 6,
            },
            {
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                category: 'Fiction',
                description: 'A fable about following your dream.',
                imageUrl: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL._SY445_SX342_.jpg',
                totalQuantity: 5,
                availableQuantity: 5,
            },
            {
                title: 'Rich Dad Poor Dad',
                author: 'Robert T. Kiyosaki',
                category: 'Finance',
                description: 'What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!',
                imageUrl: 'https://m.media-amazon.com/images/I/51u27pOnmFL._SY445_SX342_.jpg',
                totalQuantity: 10,
                availableQuantity: 10,
            },
            {
                title: 'Sapiens',
                author: 'Yuval Noah Harari',
                category: 'History',
                description: 'A Brief History of Humankind.',
                imageUrl: 'https://m.media-amazon.com/images/I/41yu2qXhXXL._SX324_BO1,204,203,200_.jpg',
                totalQuantity: 8,
                availableQuantity: 8,
            },
            {
                title: 'Man\'s Search for Meaning',
                author: 'Viktor E. Frankl',
                category: 'Philosophy',
                description: 'A psychiatrist\'s memoir of life in Nazi death camps and its lessons for survival.',
                imageUrl: 'https://m.media-amazon.com/images/I/41-9O99f7TL._SX331_BO1,204,203,200_.jpg',
                totalQuantity: 7,
                availableQuantity: 7,
            },
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                category: 'Fiction',
                description: 'A classic of American literature.',
                imageUrl: 'https://m.media-amazon.com/images/I/4166S78l71L._SX304_BO1,204,203,200_.jpg',
                totalQuantity: 4,
                availableQuantity: 4,
            },
            {
                title: 'The 7 Habits of Highly Effective People',
                author: 'Stephen R. Covey',
                category: 'Business',
                description: 'Powerful Lessons in Personal Change.',
                imageUrl: 'https://m.media-amazon.com/images/I/51-U-y6rLHL._SY445_SX342_.jpg',
                totalQuantity: 9,
                availableQuantity: 9,
            }
        ];

        await Book.insertMany(books);
        console.log('Sample books added successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error with seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();
