import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Row, Col } from 'react-bootstrap';
import { FaUndo, FaBookReader, FaHistory, FaCalendarCheck, FaUserCircle } from 'react-icons/fa';
import api from '../../services/api';

const BorrowedBooks = () => {
    const [borrows, setBorrows] = useState([]);

    useEffect(() => {
        fetchBorrows();
    }, []);

    const fetchBorrows = async () => {
        try {
            const { data } = await api.get('/admin/borrows');
            // Show both Approved (currently borrowed) and Returned for history
            setBorrows(data.filter(b => b.status === 'Approved' || b.status === 'Returned'));
        } catch (error) {
            console.error('Error fetching borrows:', error);
        }
    };
    
    const handleReturn = async (id) => {
        try {
            await api.put(`/admin/borrows/${id}`, { status: 'Returned' });
            fetchBorrows();
        } catch (error) {
            alert('Failed to mark as returned');
        }
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }} className="p-4 p-lg-5 animate-fade-in">
            <Container fluid>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-black mb-1 text-dark tracking-tighter" style={{ fontSize: '2.5rem' }}>
                            Borrowing Logs
                        </h1>
                        <p className="text-secondary mb-0 fw-medium">
                            Complete history of active loans and returned library items.
                        </p>
                    </div>
                    <Badge bg="white" className="text-primary border border-2 border-primary border-opacity-10 p-3 rounded-4 shadow-sm fw-black px-4 h-auto d-flex align-items-center">
                        <FaHistory className="me-2" /> {borrows.length} TOTAL RECORDS
                    </Badge>
                </div>

                {/* Table */}
                <div className="table-responsive table-responsive-stack shadow-xl rounded-2xl bg-white border-0 overflow-hidden mb-5">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light text-muted">
                            <tr>
                                <th className="ps-4 py-4 extra-small fw-black text-uppercase tracking-wider border-0">Member</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Book Details</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Timeline</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Current Status</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {borrows.length > 0 ? borrows.map((borrow) => (
                                <tr key={borrow._id} className="transition-all">
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3 text-success">
                                                <FaUserCircle size={20} />
                                            </div>
                                            <div>
                                                <div className="fw-black text-dark tracking-tighter mb-0">{borrow.user?.name}</div>
                                                <div className="extra-small text-muted fw-bold">{borrow.user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center">
                                            {borrow.book ? (
                                                <>
                                                    <img 
                                                        src={borrow.book.imageUrl} 
                                                        alt={borrow.book.title} 
                                                        className="rounded-3 shadow-sm me-3 border border-light" 
                                                        style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                                                        onError={(e) => e.target.src = 'https://via.placeholder.com/40x60?text=No+Cover'}
                                                    />
                                                    <div>
                                                        <div className="fw-black text-dark tracking-tighter mb-0" style={{ fontSize: '0.85rem' }}>{borrow.book.title}</div>
                                                        <div className="extra-small text-muted fw-bold">BY {borrow.book.author.toUpperCase()}</div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-secondary extra-small fw-black px-2 py-1 bg-light rounded">[RECORD ARCHIVED]</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex flex-column gap-1">
                                            <div className="d-flex align-items-center gap-2 extra-small fw-bold">
                                                <span className="text-muted opacity-50 text-uppercase" style={{ width: '35px' }}>Out:</span> 
                                                <span className="text-dark">{borrow.borrowDate ? new Date(borrow.borrowDate).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 extra-small fw-bold text-success">
                                                <span className="text-muted opacity-50 text-uppercase" style={{ width: '35px' }}>In:</span> 
                                                <span>{borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : '--'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <Badge className={`px-3 py-2 rounded-pill fw-black extra-small tracking-wider ${borrow.status === 'Approved' ? 'badge-soft-warning' : 'badge-soft-success'}`}>
                                            {borrow.status === 'Approved' ? 'OUT ON LOAN' : 'RETURNED'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-center">
                                        {borrow.status === 'Approved' ? (
                                            <Button 
                                                variant="light" 
                                                size="sm" 
                                                onClick={() => handleReturn(borrow._id)} 
                                                className="rounded-4 px-3 py-2 fw-black border-0 shadow-sm text-primary transition-all hover-scale d-inline-flex align-items-center gap-2"
                                            >
                                                <FaUndo /> MARK RETURN
                                            </Button>
                                        ) : (
                                            <div className="text-success p-2 bg-success bg-opacity-5 rounded-circle d-inline-flex mx-auto">
                                                <FaCalendarCheck />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <div className="py-5 text-muted opacity-50">
                                            <FaBookReader size={55} className="mb-4" />
                                            <h4 className="fw-black tracking-tighter">No Borrow Records</h4>
                                            <p className="fw-medium">The history is currently empty.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default BorrowedBooks;
