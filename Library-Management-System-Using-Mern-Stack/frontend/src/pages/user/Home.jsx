import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaBook } from 'react-icons/fa';
import api from '../../services/api';
import BookCard from '../../components/BookCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await api.get(`/books?keyword=${keyword}&category=${category}`);
                setBooks(data);
                setError('');
            } catch (err) {
                setError('Failed to load books. Is the backend running?');
            }
        };
        fetchBooks();
    }, [keyword, category]);

    const categories = ['Fiction', 'Science', 'History', 'Technology', 'Business', 'Biography', 'Finance', 'Productivity', 'Self-Help', 'Psychology'];

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }}>
            <Container className="py-4 animate-slide-up">
                {/* Hero Section */}
                <div className="rounded-5 p-4 p-md-5 mb-5 text-white position-relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
                    <div className="position-absolute top-0 end-0 p-4 p-md-5 opacity-10 d-none d-md-block">
                        <FaBook size={220} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Badge bg="white" className="text-primary px-3 py-2 rounded-pill fw-black mb-3 shadow-sm">
                            NEW COLLECTION 2024
                        </Badge>
                        <h1 className="fw-black mb-3 tracking-tighter" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', lineHeight: 1.1 }}>
                            Discover Your Next{' '}
                            <span className="text-white px-3 rounded-pill" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>Great Read</span>
                        </h1>
                        <p className="opacity-75 mb-4" style={{ maxWidth: '500px', fontSize: '1.05rem' }}>
                            Browse our curated collection of books across multiple categories. 
                            Borrow and enjoy reading today.
                        </p>
                        <div className="d-flex gap-3 align-items-center mt-4 flex-wrap">
                            <div className="d-flex" style={{ gap: '-6px' }}>
                                {[10, 11, 12, 13].map((idx, i) => (
                                    <img key={idx} src={`https://i.pravatar.cc/100?img=${idx}`} alt="reader" className="rounded-circle" style={{ width: '32px', height: '32px', border: '2px solid white', marginLeft: i > 0 ? '-8px' : '0' }} />
                                ))}
                            </div>
                            <span className="small fw-bold opacity-75">Join 2,000+ active readers</span>
                        </div>
                    </div>
                </div>

                {/* Catalog Header + Filters */}
                <Row className="mb-4 g-3 align-items-center">
                    <Col lg={4} md={6}>
                        <h3 className="fw-black mb-0 text-dark">Library Catalog</h3>
                        <p className="text-secondary small mb-0">Showing {books.length} books available for you</p>
                    </Col>
                    <Col lg={8} md={6}>
                        <div className="d-flex flex-column flex-sm-row gap-2 justify-content-lg-end">
                            <div className="position-relative">
                                <FaFilter className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={13} />
                                <Form.Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="ps-5 rounded-pill shadow-sm bg-white border-0 py-2 fw-medium"
                                    style={{ minWidth: '200px' }}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat, i) => (
                                        <option key={i} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div className="position-relative flex-grow-1">
                                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title, author, or keyword..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="ps-5 rounded-pill shadow-sm bg-white border-0 py-2 fw-medium"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Error */}
                {error && (
                    <div className="alert alert-danger rounded-4 border-0 shadow-sm mb-4">{error}</div>
                )}

                {/* Book Grid */}
                <Row className="g-4">
                    {books.map((book) => (
                        <Col key={book._id} xs={12} sm={6} md={4} lg={3}>
                            <BookCard book={book} />
                        </Col>
                    ))}
                </Row>

                {books.length === 0 && !error && (
                    <div className="text-center py-5 my-5">
                        <div className="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-4">
                            <FaSearch size={36} className="text-primary opacity-50" />
                        </div>
                        <h4 className="fw-bold text-dark">No books found</h4>
                        <p className="text-secondary">Try adjusting your filters or search keywords.</p>
                        <button className="btn btn-primary rounded-pill px-4 mt-2 fw-bold" onClick={() => { setKeyword(''); setCategory(''); }}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;
