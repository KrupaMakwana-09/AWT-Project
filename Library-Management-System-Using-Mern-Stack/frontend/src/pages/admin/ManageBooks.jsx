import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBook, FaFilter } from 'react-icons/fa';
import api from '../../services/api';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        imageUrl: '',
        totalQuantity: 1
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const { data } = await api.get('/books');
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setSelectedBook(null);
        setFormData({ title: '', author: '', category: '', description: '', imageUrl: '', totalQuantity: 1 });
    };

    const handleShow = () => setShow(true);

    const handleEdit = (book) => {
        setSelectedBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            category: book.category,
            description: book.description || '',
            imageUrl: book.imageUrl,
            totalQuantity: book.totalQuantity
        });
        setEditMode(true);
        setShow(true);
    };

    const confirmDelete = (id) => {
        setBookToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!bookToDelete) return;
        try {
            await api.delete(`/admin/books/${bookToDelete}`);
            fetchBooks();
            setShowDeleteModal(false);
            setBookToDelete(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Error deleting book');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await api.put(`/admin/books/${selectedBook._id}`, formData);
            } else {
                await api.post('/admin/books', formData);
            }
            fetchBooks();
            handleClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    const categories = ['Fiction', 'Science', 'History', 'Technology', 'Business', 'Biography', 'Finance', 'Productivity', 'Self-Help', 'Psychology'];

    const filteredBooks = books.filter(book => 
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterCategory === '' || book.category === filterCategory)
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }} className="p-4 p-lg-5 animate-fade-in">
            <Container fluid>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-black mb-1 text-dark tracking-tighter" style={{ fontSize: '2.5rem' }}>
                            Book Catalog
                        </h1>
                        <p className="text-secondary mb-0 fw-bold">
                            Manage your library's books, stock levels, and metadata.
                        </p>
                    </div>
                    <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2 rounded-4 px-4 py-3 fw-bold border-0 shadow-lg transition-all hover-scale">
                        <FaPlus /> Add New Book
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-5 shadow-sm mb-4 border-0">
                    <Row className="g-3 align-items-center">
                        <Col lg={6}>
                            <InputGroup className="bg-light rounded-4 overflow-hidden border-0">
                                <InputGroup.Text className="bg-light border-0 ps-4 pe-2 text-muted">
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control 
                                    placeholder="Search by title or author..." 
                                    className="bg-light border-0 py-3 shadow-none fw-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <div className="position-relative">
                                <FaFilter className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={12} />
                                <Form.Select 
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="ps-5 rounded-4 bg-light border-0 py-3 shadow-none fw-bold text-dark h-auto"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat, i) => (
                                        <option key={i} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={3} className="text-lg-end">
                             <Badge bg="white" className="text-primary border border-2 border-primary border-opacity-10 p-3 rounded-4 shadow-sm fw-black w-100 h-100 d-flex align-items-center justify-content-center">
                                TOTAL: {filteredBooks.length} ITEMS
                             </Badge>
                        </Col>
                    </Row>
                </div>

                {/* Table */}
                <div className="table-responsive table-responsive-stack shadow-xl rounded-2xl bg-white border-0 overflow-hidden mb-5">
                    <Table hover className="align-middle mb-0">
                        <thead>
                            <tr className="bg-light">
                                <th className="ps-4 py-4 extra-small fw-black text-uppercase tracking-wider text-muted border-0">Book Detail</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider text-muted border-0">Category</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider text-muted border-0">Inventory</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider text-muted border-0 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                                <tr key={book._id} className="transition-all">
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="position-relative">
                                                <img 
                                                    src={book.imageUrl} 
                                                    alt={book.title} 
                                                    className="rounded-3 shadow-sm border border-light" 
                                                    style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                                                    onError={(e) => {e.target.src = 'https://via.placeholder.com/50x70?text=No+Image'}}
                                                />
                                                <Badge bg="primary" className="position-absolute bottom-0 end-0 rounded-circle p-1 mb-n1 me-n1 shadow-sm border border-white">
                                                    <FaBook size={8} />
                                                </Badge>
                                            </div>
                                            <div className="ms-3">
                                                <div className="fw-black text-dark tracking-tighter mb-0" style={{ fontSize: '0.95rem' }}>{book.title}</div>
                                                <div className="small text-secondary fw-black">{book.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge className="badge-soft-primary px-3 py-2 rounded-pill fw-black extra-small tracking-wider">
                                            {book.category.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <span className={`fw-black ${book.availableQuantity > 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: '1rem' }}>
                                                    {book.availableQuantity}
                                                </span>
                                                <span className="extra-small fw-black text-secondary">/ {book.totalQuantity} AVAILABLE</span>
                                            </div>
                                            <div className="progress rounded-pill overflow-hidden bg-light" style={{ height: '4px', width: '100px' }}>
                                                <div 
                                                    className={`progress-bar ${book.availableQuantity / book.totalQuantity < 0.2 ? 'bg-danger' : 'bg-primary'}`} 
                                                    style={{ width: `${(book.availableQuantity / book.totalQuantity) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Button variant="light" size="sm" onClick={() => handleEdit(book)} className="text-primary rounded-3 p-2 border-0 shadow-sm transition-all hover-scale">
                                                <FaEdit size={16} />
                                            </Button>
                                            <Button variant="light" size="sm" onClick={() => confirmDelete(book._id)} className="text-danger rounded-3 p-2 border-0 shadow-sm transition-all hover-scale">
                                                <FaTrash size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <div className="py-4 text-muted opacity-50">
                                            <FaBook size={48} className="mb-3" />
                                            <div className="fw-bold">No books found in the catalog</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Modal */}
                <Modal show={show} onHide={handleClose} centered size="lg" className="premium-modal">
                    <Modal.Header closeButton className="border-0 px-4 pt-4">
                        <Modal.Title className="fw-black tracking-tighter fs-3">{editMode ? 'Edit Book Record' : 'Add New Book'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4 pt-2">
                        <Form onSubmit={handleSubmit}>
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Book Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g. The Pragmatic Programmer"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="form-input-custom"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Author Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g. Andrew Hunt"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="form-input-custom"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Category</Form.Label>
                                        <Form.Select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="form-input-custom"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat, index) => (
                                                <option key={index} value={cat}>{cat}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Brief overview of the book..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="form-input-custom h-auto"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Book Cover URL</Form.Label>
                                        <div className="d-flex gap-3">
                                            <div 
                                                className="rounded-3 border bg-light d-flex align-items-center justify-content-center overflow-hidden" 
                                                style={{ width: '80px', height: '110px', flexShrink: 0 }}
                                            >
                                                {formData.imageUrl ? (
                                                    <img 
                                                        src={formData.imageUrl} 
                                                        alt="Preview" 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => {e.target.src = 'https://via.placeholder.com/80x110?text=Error'}}
                                                    />
                                                ) : (
                                                    <div className="text-muted extra-small fw-bold text-center p-2">NO PREVIEW</div>
                                                )}
                                            </div>
                                            <div className="flex-grow-1">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="https://..."
                                                    value={formData.imageUrl}
                                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                                    className="form-input-custom"
                                                    required
                                                />
                                                <div className="extra-small text-muted mt-2 fw-medium">
                                                    Paste a URL from Amazon, Goodreads, or any image host.
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="extra-small fw-black text-uppercase tracking-wider text-muted">Total Stock</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={formData.totalQuantity}
                                            onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value })}
                                            className="form-input-custom"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end gap-3 mt-5">
                                <Button variant="light" onClick={handleClose} className="rounded-4 px-4 py-3 fw-bold border-0 text-muted">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="rounded-4 px-5 py-3 fw-black border-0 shadow-lg transition-all hover-scale">
                                    {editMode ? 'Update Record' : 'Save Book'}
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className="premium-modal">
                    <Modal.Body className="p-5 text-center">
                        <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                            <FaTrash size={32} />
                        </div>
                        <h3 className="fw-black tracking-tighter mb-2">Delete Book?</h3>
                        <p className="text-secondary fw-medium mb-4">
                            Are you sure you want to delete this book? This action cannot be undone and will remove it from the catalog permanently.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="light" onClick={() => setShowDeleteModal(false)} className="rounded-4 px-4 py-2 fw-bold border-0 text-muted">
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete} className="rounded-4 px-4 py-2 fw-black border-0 shadow-lg transition-all hover-scale">
                                Confirm Delete
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default ManageBooks;
