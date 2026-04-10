import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { FaBan, FaCheck, FaTrash, FaUserShield, FaSearch, FaUserCircle } from 'react-icons/fa';
import api from '../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleBlock = async (id) => {
        try {
            await api.put(`/admin/users/${id}/block`);
            fetchUsers();
        } catch (error) {
            alert('Error updating user status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }} className="p-4 p-lg-5 animate-fade-in">
            <Container fluid>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-black mb-1 text-dark tracking-tighter" style={{ fontSize: '2.5rem' }}>
                            User Management
                        </h1>
                        <p className="text-secondary mb-0 fw-medium">
                            Manage your library's member base and security permissions.
                        </p>
                    </div>
                    <Badge bg="white" className="text-primary border border-2 border-primary border-opacity-10 p-3 rounded-4 shadow-sm fw-black px-4">
                        {users.length} TOTAL MEMBERS
                    </Badge>
                </div>

                {/* Filter */}
                <div className="bg-white p-4 rounded-5 shadow-sm mb-4 border-0">
                    <Row className="g-3 align-items-center">
                        <Col lg={8}>
                            <InputGroup className="bg-light rounded-4 overflow-hidden border-0">
                                <InputGroup.Text className="bg-light border-0 ps-4 pe-2 text-muted">
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control 
                                    placeholder="Search members by name or email..." 
                                    className="bg-light border-0 py-3 shadow-none fw-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={4} className="text-lg-end">
                            <Button variant="dark" className="rounded-4 px-4 py-3 fw-bold border-0 shadow-sm w-100 d-flex align-items-center justify-content-center gap-2">
                                <FaUserShield /> Security Logs
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* Users Table */}
                <div className="table-responsive table-responsive-stack shadow-xl rounded-2xl bg-white border-0 overflow-hidden mb-5">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light text-muted">
                            <tr>
                                <th className="ps-4 py-4 extra-small fw-black text-uppercase tracking-wider border-0">Member Profile</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Email Address</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0">Status</th>
                                <th className="py-4 extra-small fw-black text-uppercase tracking-wider border-0 text-center">Security Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <tr key={user._id} className="transition-all">
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-primary">
                                                <FaUserCircle size={24} />
                                            </div>
                                            <div>
                                                <div className="fw-black text-dark tracking-tighter mb-0">{user.name}</div>
                                                <div className="extra-small text-muted fw-bold text-uppercase opacity-75">ID: {user._id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="fw-bold text-secondary" style={{ fontSize: '0.9rem' }}>{user.email}</div>
                                    </td>
                                    <td className="py-3">
                                        <Badge className={`px-3 py-2 rounded-pill fw-black extra-small tracking-wider ${user.isBlocked ? 'badge-soft-danger' : 'badge-soft-success'}`}>
                                            {user.isBlocked ? 'ACCESS BLOCKED' : 'ACTIVE ACCESS'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Button 
                                                variant="light" 
                                                size="sm" 
                                                className={`rounded-3 p-2 px-3 border-0 shadow-sm fw-bold d-inline-flex align-items-center gap-2 ${user.isBlocked ? 'text-success' : 'text-warning'}`}
                                                onClick={() => handleBlock(user._id)}
                                            >
                                                {user.isBlocked ? <><FaCheck /> Restore</> : <><FaBan /> Block</>}
                                            </Button>
                                            <Button 
                                                variant="light" 
                                                size="sm" 
                                                className="rounded-3 p-2 border-0 shadow-sm text-danger transition-all hover-scale"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted opacity-50">
                                        <div className="py-4">
                                            <FaUserCircle size={48} className="mb-3" />
                                            <div className="fw-bold fs-5">No members found matching your search</div>
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

export default ManageUsers;
