import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';

const BookCard = ({ book }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('library_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav._id === book._id));
    }, [book._id]);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const favorites = JSON.parse(localStorage.getItem('library_favorites') || '[]');
        let updatedFavorites;
        
        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav._id !== book._id);
        } else {
            updatedFavorites = [...favorites, book];
        }
        
        localStorage.setItem('library_favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <Card className="h-100 border-0 shadow-sm animate-fade-in overflow-hidden rounded-4">
            <div className="book-card-img-wrapper position-relative">
                <Card.Img variant="top" src={book.imageUrl} className="book-img" alt={book.title} />
                <div className="position-absolute top-0 end-0 m-3">
                    <Button 
                        variant="white" 
                        className="glass border-0 rounded-circle p-2 text-danger shadow-sm d-flex align-items-center justify-content-center"
                        onClick={toggleFavorite}
                        style={{ width: '35px', height: '35px' }}
                    >
                        {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                    </Button>
                </div>
                <Badge 
                    bg="primary" 
                    className="position-absolute bottom-0 start-0 m-3 badge-custom shadow-sm"
                >
                    {book.category}
                </Badge>
            </div>
            
            <Card.Body className="p-4 d-flex flex-column">
                <Card.Title className="fw-bold fs-5 mb-2 text-dark text-truncate" title={book.title}>{book.title}</Card.Title>
                <Card.Text className="text-secondary small mb-3 flex-grow-1">
                    By <span className="fw-semibold">{book.author}</span>
                </Card.Text>
                
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <div className="d-flex flex-column">
                        <span className="small text-muted" style={{ fontSize: '0.7rem' }}>Availability</span>
                        <span className={`fw-bold small ${book.availableQuantity > 0 ? 'text-success' : 'text-danger'}`}>
                            {book.availableQuantity > 0 ? `${book.availableQuantity} Left` : 'Out of Stock'}
                        </span>
                    </div>
                    <Link to={`/book/${book._id}`} className="btn btn-primary btn-sm rounded-pill px-3 shadow-none fw-bold">
                        Details <FaArrowRight size={10} className="ms-1" />
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
