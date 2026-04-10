import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { FaSave, FaCheckCircle, FaExclamationCircle, FaUser, FaEnvelope, FaLock, FaCamera, FaEdit } from 'react-icons/fa';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stats, setStats] = useState({ borrowed: 0, returned: 0, favorites: 0 });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/users/profile');
                setName(data.name);
                setEmail(data.email);
                
                // Get favorites count from localStorage
                const favs = JSON.parse(localStorage.getItem('library_favorites') || '[]');
                
                setStats({
                    borrowed: data.stats?.borrowed || 0,
                    returned: data.stats?.returned || 0,
                    favorites: favs.length
                });
            } catch (err) {
                setError('Failed to load profile data');
            }
        };
        fetchProfile();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        if (!name || !email) {
            return setError('Name and Email are required');
        }

        setLoading(true);
        try {
            const payload = { name, email };
            if (password) payload.password = password;
            
            const { data } = await api.put('/users/profile', payload);
            
            // Critical: Update both context and localStorage with the NEW data from server
            const updatedUser = { 
                ...user, 
                name: data.name, 
                email: data.email 
            };
            
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setMessage('Profile updated successfully!');
            setPassword('');
            
            // Scroll to top to see success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || user?.name || 'U')}&background=6366f1&color=fff&size=200&rounded=true&bold=true`;
    const initials = (name || user?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="profile-page py-5" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)' }}>
            <Container>
                <Row className="justify-content-center g-4">
                    {/* Left: Avatar Card */}
                    <Col lg={4} md={12}>
                        <Card className="border-0 shadow-lg rounded-5 overflow-hidden text-center">
                            <div className="profile-hero py-5 px-4" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                                <div className="avatar-wrapper mx-auto mb-4 position-relative" style={{ width: '130px', height: '130px' }}>
                                    <img
                                        src={avatarUrl}
                                        alt={name}
                                        className="rounded-circle border-4 border-white shadow-xl"
                                        style={{ width: '130px', height: '130px', objectFit: 'cover', border: '4px solid white' }}
                                    />
                                    <div className="avatar-badge position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm" style={{ cursor: 'pointer' }}>
                                        <FaCamera className="text-primary" size={14} />
                                    </div>
                                </div>
                                <h3 className="fw-black text-white mb-1">{name || user?.name}</h3>
                                <p className="text-white text-opacity-75 mb-3">{email || user?.email}</p>
                                <Badge bg="light" className="text-primary px-3 py-2 rounded-pill fw-bold text-capitalize">{user?.role}</Badge>
                            </div>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-around py-3">
                                    <div className="text-center">
                                        <div className="fw-black fs-3 text-primary">{stats.borrowed}</div>
                                        <div className="text-muted extra-small text-uppercase fw-bold">Borrowed</div>
                                    </div>
                                    <div className="vr mx-2"></div>
                                    <div className="text-center">
                                        <div className="fw-black fs-3 text-success">{stats.returned}</div>
                                        <div className="text-muted extra-small text-uppercase fw-bold">Returned</div>
                                    </div>
                                    <div className="vr mx-2"></div>
                                    <div className="text-center">
                                        <div className="fw-black fs-3 text-warning">{stats.favorites}</div>
                                        <div className="text-muted extra-small text-uppercase fw-bold">Favorites</div>
                                    </div>
                                </div>
                                <div className="mt-3 p-3 bg-light rounded-4">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaUser className="text-primary me-2" size={14} />
                                        <span className="small text-muted">Member Since</span>
                                        <span className="ms-auto small fw-bold">{user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                                        <span className="small text-muted">Account Status</span>
                                        <span className="ms-auto small fw-bold text-success">Active</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right: Edit Form */}
                    <Col lg={8} md={12}>
                        <Card className="border-0 shadow-lg rounded-5 overflow-hidden">
                            <div className="p-5">
                                <div className="d-flex align-items-center mb-5">
                                    <div className="bg-primary bg-opacity-10 p-3 rounded-4 me-3">
                                        <FaEdit className="text-primary" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="fw-black mb-0">Edit Profile</h4>
                                        <p className="text-muted mb-0 small">Update your personal information</p>
                                    </div>
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

                                <Form onSubmit={submitHandler}>
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Form.Group controlId="name">
                                                <Form.Label className="text-muted fw-bold small text-uppercase letter-spacing-1 mb-2">Full Name</Form.Label>
                                                <div className="input-icon-wrapper position-relative">
                                                    <FaUser className="input-icon text-muted" />
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Your full name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="form-input-custom ps-5 rounded-4"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="email">
                                                <Form.Label className="text-muted fw-bold small text-uppercase letter-spacing-1 mb-2">Email Address</Form.Label>
                                                <div className="input-icon-wrapper position-relative">
                                                    <FaEnvelope className="input-icon text-muted" />
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Your email address"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="form-input-custom ps-5 rounded-4"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group controlId="password">
                                                <Form.Label className="text-muted fw-bold small text-uppercase letter-spacing-1 mb-2">New Password <span className="text-muted fw-normal">(leave blank to keep current)</span></Form.Label>
                                                <div className="input-icon-wrapper position-relative">
                                                    <FaLock className="input-icon text-muted" />
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Enter new password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="form-input-custom ps-5 rounded-4"
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="mt-5 d-flex gap-3">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={loading}
                                            className="rounded-pill py-3 px-5 fw-bold shadow-sm d-flex align-items-center"
                                        >
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                                            ) : (
                                                <><FaSave className="me-2" />Save Changes</>
                                            )}
                                        </Button>
                                        <Button
                                            variant="light"
                                            type="button"
                                            className="rounded-pill py-3 px-4 fw-bold"
                                            onClick={() => { setPassword(''); setMessage(''); setError(''); }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
