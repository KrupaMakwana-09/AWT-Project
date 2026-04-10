import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Alert, Button } from 'react-bootstrap';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaUser, FaTag, FaBook, FaHeart, FaRegHeart } from 'react-icons/fa';
import api from '../../services/api';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await api.get(`/books/${id}`);
                setBook(data);
                const favs = JSON.parse(localStorage.getItem('library_favorites') || '[]');
                setIsFavorite(favs.some(f => f._id === data._id));
            } catch (err) {
                setError('Book not found');
            }
        };
        fetchBook();
    }, [id]);

    const handleBorrowRequest = async () => {
        try {
            setLoading(true);
            setMessage('');
            setError('');
            await api.post('/borrows', { bookId: book._id });
            setMessage('Request sent! The admin will review your request.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send request');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = () => {
        const favs = JSON.parse(localStorage.getItem('library_favorites') || '[]');
        let updated;
        if (isFavorite) {
            updated = favs.filter(f => f._id !== book._id);
        } else {
            updated = [...favs, book];
        }
        localStorage.setItem('library_favorites', JSON.stringify(updated));
        setIsFavorite(!isFavorite);
    };

    if (!book && !error) return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
                <div className="text-muted fw-semibold">Loading book...</div>
            </div>
        </div>
    );

    if (error && !book) return (
        <Container className="py-5 text-center">
            <FaBook size={60} className="text-muted opacity-25 mb-3" />
            <h4 className="text-muted">Book not found</h4>
            <Button variant="primary" className="rounded-pill px-4 mt-3" onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
    );

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
            <Container className="py-5">
                {/* Back button */}
                <div className="d-flex align-items-center mb-4 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                    <div className="bg-white rounded-circle shadow-sm p-2 me-3 d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px' }}>
                        <FaArrowLeft className="text-primary" size={15} />
                    </div>
                    <span className="text-secondary fw-semibold">Back to Catalog</span>
                </div>

                <Row className="g-5">
                    {/* Book Cover Column */}
                    <Col lg={5} className="d-flex flex-column align-items-center">
                        <div className="book-cover-container position-relative" style={{ width: '100%', maxWidth: '360px' }}>
                            {/* Decorative background blur */}
                            <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(20px)', zIndex: 0 }}></div>
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="img-fluid rounded-4 shadow-2xl position-relative book-detail-cover"
                                style={{ zIndex: 1, objectFit: 'contain', maxHeight: '480px', width: '100%' }}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x420?text=No+Image'; }}
                            />
                        </div>

                        {/* Quick Stats below cover */}
                        <div className="d-flex gap-3 mt-4 w-100" style={{ maxWidth: '360px' }}>
                            <div className="flex-fill bg-white rounded-4 p-3 text-center shadow-sm border">
                                <div className="fw-black fs-2 text-primary">{book.availableQuantity}</div>
                                <div className="text-muted extra-small text-uppercase fw-bold">Available</div>
                            </div>
                            <div className="flex-fill bg-white rounded-4 p-3 text-center shadow-sm border">
                                <div className="fw-black fs-2 text-dark">{book.totalQuantity}</div>
                                <div className="text-muted extra-small text-uppercase fw-bold">Total Copies</div>
                            </div>
                        </div>
                    </Col>

                    {/* Book Info Column */}
                    <Col lg={7}>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <Badge bg="primary" className="rounded-pill px-3 py-2 text-uppercase letter-spacing-1" style={{ fontSize: '0.7rem' }}>
                                <FaTag size={10} className="me-1" />{book.category}
                            </Badge>
                            <Badge
                                className={`rounded-pill px-3 py-2 ${book.availableQuantity > 0 ? 'bg-success' : 'bg-danger'}`}
                                style={{ fontSize: '0.7rem' }}
                            >
                                {book.availableQuantity > 0
                                    ? <><span className="blink-dot me-2">●</span>In Stock</>
                                    : <><FaExclamationCircle size={10} className="me-1" />Out of Stock</>
                                }
                            </Badge>
                        </div>

                        <h1 className="fw-black mb-2 tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.1 }}>{book.title}</h1>

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                                <FaUser className="text-primary" size={12} />
                            </div>
                            <span className="fw-bold text-primary fs-5">{book.author}</span>
                        </div>

                        {/* Decorative separator */}
                        <div className="details-spacer mb-4"></div>

                        <div className="mb-5">
                            <h6 className="text-muted text-uppercase fw-black letter-spacing-2 mb-3" style={{ fontSize: '0.7rem' }}>
                                <FaBook size={12} className="me-2" />About This Book
                            </h6>
                            <p className="text-secondary lh-lg" style={{ fontSize: '1.05rem' }}>
                                {book.description || 'No description available for this title.'}
                            </p>
                        </div>

                        {message && (
                            <Alert variant="success" className="rounded-4 border-0 shadow-sm animate-bounce-in">
                                <FaCheckCircle className="me-2" />{message}
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger" className="rounded-4 border-0 shadow-sm">
                                <FaExclamationCircle className="me-2" />{error}
                            </Alert>
                        )}

                        <div className="d-flex gap-3 flex-wrap mt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                className="rounded-pill px-5 py-3 fw-black shadow-xl flex-grow-1 flex-sm-grow-0 transition-all hover-scale"
                                disabled={book.availableQuantity <= 0 || loading}
                                onClick={handleBorrowRequest}
                                style={{ letterSpacing: '0.05em', minWidth: '200px' }}
                            >
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2" />Sending...</>
                                ) : book.availableQuantity > 0 ? (
                                    'Request to Borrow'
                                ) : (
                                    'Currently Unavailable'
                                )}
                            </Button>
                            <Button
                                variant={isFavorite ? 'danger' : 'outline-secondary'}
                                size="lg"
                                className="rounded-circle p-3 d-flex align-items-center justify-content-center transition-all"
                                onClick={toggleFavorite}
                                style={{ width: '56px', height: '56px' }}
                                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BookDetails;
