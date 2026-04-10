import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaUndo } from 'react-icons/fa';
import api from '../../services/api';

const MyBorrowedBooks = () => {
    const [borrows, setBorrows] = useState([]);
    
    useEffect(() => {
        fetchBorrows();
    }, []);

    const fetchBorrows = async () => {
        const { data } = await api.get('/borrows/myborrows');
        setBorrows(data.filter(b => b.status === 'Approved' || b.status === 'Pending'));
    };

    const handleReturn = async (id) => {
        try {
            await api.put(`/borrows/${id}/return`);
            fetchBorrows();
        } catch (error) {
            alert('Failed to return book');
        }
    };

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4 text-primary">My Borrowed Books</h2>
            <div className="bg-white rounded-4 shadow-sm overflow-hidden p-3 border">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="bg-light text-muted">
                        <tr>
                            <th className="py-3 px-4 border-0">Book</th>
                            <th className="py-3 border-0">Status</th>
                            <th className="py-3 border-0">Borrow Date</th>
                            <th className="py-3 px-4 border-0 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrows.map((borrow) => (
                            <tr key={borrow._id} className="border-bottom">
                                <td className="py-3 px-4">
                                    <div className="d-flex align-items-center">
                                        <img src={borrow.book?.imageUrl || ''} alt={borrow.book?.title || 'Unknown Book'} style={{ width: '50px', height: '70px', objectFit: 'cover' }} className="rounded shadow-sm me-3" />
                                        <div>
                                            <div className="fw-bold text-dark">{borrow.book?.title || 'Unknown Book'}</div>
                                            <div className="small text-muted">{borrow.book?.author || 'Unknown Author'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 text-center">
                                    <Badge bg={borrow.status === 'Approved' ? 'success' : 'warning'} className="rounded-pill px-3 py-2 fw-normal">
                                        {borrow.status}
                                    </Badge>
                                </td>
                                <td className="py-3 text-secondary">
                                    {borrow.borrowDate ? new Date(borrow.borrowDate).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="py-3 px-4 text-end">
                                    {borrow.status === 'Approved' && (
                                        <Button variant="outline-primary" size="sm" onClick={() => handleReturn(borrow._id)} className="rounded-pill px-3 py-1 shadow-sm d-inline-flex align-items-center">
                                            <FaUndo className="me-2" /> Return
                                        </Button>
                                    )}
                                    {borrow.status === 'Pending' && (
                                        <span className="text-muted small fst-italic">Awaiting Approval</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {borrows.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    <p className="mb-0 fs-5">You have no active borrows or pending requests.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default MyBorrowedBooks;
