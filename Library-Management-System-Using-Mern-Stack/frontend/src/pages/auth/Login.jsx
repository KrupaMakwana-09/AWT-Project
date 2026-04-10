import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100 mt-n5 pt-5">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="bg-primary text-white text-center py-4">
                            <h2 className="fw-bold mb-0">Welcome Back</h2>
                            <p className="mb-0 text-white-50">Sign in to your account</p>
                        </div>
                        <Card.Body className="p-5">
                            {error && <Alert variant="danger" className="rounded-3 border-0">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label className="text-muted fw-semibold small text-uppercase">Email address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-secondary"/></span>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                            className="border-start-0 ps-0 bg-light shadow-none"
                                            style={{ height: '50px' }}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label className="text-muted fw-semibold small text-uppercase">Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FaLock className="text-secondary"/></span>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                            className="border-start-0 ps-0 bg-light shadow-none"
                                            style={{ height: '50px' }}
                                        />
                                    </div>
                                </Form.Group>
                                
                                <Button variant="primary" type="submit" className="w-100 rounded-pill py-2 fw-bold fs-5 mt-2 transition shadow-sm">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-4">
                                <span className="text-muted">Don't have an account? </span>
                                <Link to="/register" className="text-primary text-decoration-none fw-bold">Sign up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
