import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes, FaCalendarAlt, FaUser, FaRegFileAlt } from 'react-icons/fa';
import api from '../../services/api';

const BorrowRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/admin/borrows');
            setRequests(data.filter(req => req.status === 'Pending'));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/admin/borrows/${id}`, { status });
            fetchRequests();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating request');
        }
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }} className="p-4 p-lg-5 animate-fade-in">
            <Container fluid>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-black mb-1 text-dark tracking-tighter" style={{ fontSize: '2.5rem' }}>
                            Borrow Requests
                        </h1>
                        <p className="text-secondary mb-0 fw-medium">
                            Review and process new borrowing applications from members.
                        </p>
                    </div>
                    <Badge bg="white" className="text-warning border border-2 border-warning border-opacity-10 p-3 rounded-4 shadow-sm fw-black px-4">
                        {requests.length} PENDING APPROVALS
                    </Badge>
                </div>

                {/* Table */}
                <div className="table-responsive table-responsive-stack shadow-xl rounded-2xl bg-white border-0 overflow-hidden mb-5">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light text-muted">
                            <tr>
                                <th className="ps-4 py-4 extra-small fw-black text-uppercase tracking-wider border-0">Applicant</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Requested Book</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Request Timeline</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0 text-center">Decision</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {requests.length > 0 ? requests.map((req) => (
                                <tr key={req._id} className="transition-all hover-translate-x">
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="p-3 bg-light rounded-circle me-3 text-secondary shadow-sm">
                                                <FaUser size={18} />
                                            </div>
                                            <div>
                                                <div className="fw-black text-dark tracking-tighter mb-0">{req.user?.name}</div>
                                                <div className="extra-small text-muted fw-bold">{req.user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center">
                                            {req.book ? (
                                                <>
                                                    <img 
                                                        src={req.book.imageUrl} 
                                                        alt={req.book.title} 
                                                        className="rounded-3 shadow-sm me-3 border border-light" 
                                                        style={{ width: '45px', height: '65px', objectFit: 'cover' }}
                                                        onError={(e) => e.target.src = 'https://via.placeholder.com/45x65?text=No+Cover'}
                                                    />
                                                    <div>
                                                        <div className="fw-black text-dark tracking-tighter mb-0" style={{ fontSize: '0.9rem' }}>{req.book.title}</div>
                                                        <div className="extra-small text-muted fw-bold opacity-75">BY {req.book.author.toUpperCase()}</div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-danger extra-small fw-black">CONTENT UNAVAILABLE</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center gap-2 text-secondary">
                                            <FaCalendarAlt size={12} className="opacity-50" />
                                            <div className="fw-bold" style={{ fontSize: '0.85rem' }}>
                                                {new Date(req.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="extra-small text-muted fw-bold mt-1 ms-4">
                                            {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="py-3 text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Button 
                                                variant="success" 
                                                size="sm" 
                                                className="rounded-4 px-3 py-2 fw-black border-0 shadow-sm d-flex align-items-center gap-2 transition-all hover-scale"
                                                onClick={() => handleUpdateStatus(req._id, 'Approved')}
                                            >
                                                <FaCheck /> APPROVE
                                            </Button>
                                            <Button 
                                                variant="light" 
                                                size="sm" 
                                                className="rounded-4 px-3 py-2 fw-bold border-0 text-danger transition-all hover-bg"
                                                onClick={() => handleUpdateStatus(req._id, 'Rejected')}
                                            >
                                                <FaTimes /> REJECT
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        <div className="py-5 text-muted opacity-50">
                                            <FaRegFileAlt size={50} className="mb-4" />
                                            <h4 className="fw-black tracking-tighter">Queue is Clear</h4>
                                            <p className="fw-medium">All member requests have been processed.</p>
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

export default BorrowRequests;
