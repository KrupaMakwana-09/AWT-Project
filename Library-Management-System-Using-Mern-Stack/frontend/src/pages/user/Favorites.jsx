import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BookCard from '../../components/BookCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('library_favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter(book => book._id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('library_favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <Container className="py-5 animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-bold text-primary mb-2">My Favorite Books</h1>
                    <p className="text-secondary mb-0">Books you've saved for later</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-circle text-primary">
                    <FaHeart size={30} />
                </div>
            </div>

            {favorites.length > 0 ? (
                <Row className="g-4">
                    {favorites.map((book) => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <div className="position-relative">
                                <BookCard book={book} />
                                <Button 
                                    variant="danger" 
                                    className="position-absolute top-0 end-0 m-3 shadow-sm rounded-circle p-2 border-0"
                                    onClick={() => removeFavorite(book._id)}
                                    style={{ zIndex: 10 }}
                                >
                                    <FaTrash size={12} />
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card className="p-5 border-0 shadow-sm rounded-4 text-center">
                    <div className="mb-4 text-muted">
                        <FaHeart size={60} className="mb-3 opacity-25" />
                        <h4 className="fw-bold">Your favorites list is empty</h4>
                        <p className="text-secondary mx-auto" style={{ maxWidth: '400px' }}>
                            Discover amazing books in our catalog and click the heart icon to save them here for later.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <Button as={Link} to="/home" variant="primary" className="rounded-4 px-4 py-2">
                            Explore Books
                        </Button>
                    </div>
                </Card>
            )}
        </Container>
    );
};

export default Favorites;
