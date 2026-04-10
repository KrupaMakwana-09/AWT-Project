import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import api from '../../services/api';

const BorrowHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await api.get('/borrows/myborrows');
            setHistory(data);
        };
        fetchHistory();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Returned': return 'success';
            case 'Rejected': return 'danger';
            case 'Approved': return 'primary';
            default: return 'warning';
        }
    };

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4 text-primary">Borrow History</h2>
            <div className="bg-white rounded-4 shadow-sm overflow-hidden border">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="bg-light text-muted">
                        <tr>
                            <th className="py-3 px-4 border-0">Book</th>
                            <th className="py-3 px-4 border-0">Status</th>
                            <th className="py-3 px-4 border-0">Borrow Date</th>
                            <th className="py-3 px-4 border-0">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((borrow) => (
                            <tr key={borrow._id} className="border-bottom">
                                <td className="py-3 px-4">
                                    <div className="d-flex align-items-center">
                                        {borrow.book && <img src={borrow.book.imageUrl} alt={borrow.book.title} style={{ width: '40px', height: '60px', objectFit: 'cover' }} className="rounded shadow-sm me-3" />}
                                        <div>
                                            <div className="fw-bold text-dark">{borrow.book ? borrow.book.title : 'Book Deleted'}</div>
                                            <div className="small text-muted">{borrow.book?.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <Badge bg={getStatusBadge(borrow.status)} className="rounded-pill px-3 py-2 fw-normal">
                                        {borrow.status}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 text-secondary">
                                    {borrow.borrowDate ? new Date(borrow.borrowDate).toLocaleDateString() : '-'}
                                </td>
                                <td className="py-3 px-4 text-secondary">
                                    {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default BorrowHistory;
