import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Clear message after 5 seconds
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Container className="py-5 animate-fade-in">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h1 className="fw-bold text-primary mb-3">Contact Us</h1>
                    <p className="lead text-secondary">
                        Have a question? We're here to help! Send us a message and we'll get back to you shortly.
                    </p>
                </Col>
            </Row>

            <Row className="g-4">
                <Col lg={4}>
                    <Card className="h-100 p-4 border-0 shadow-sm rounded-4">
                        <h4 className="fw-bold mb-4">Contact Information</h4>
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">Our Location</h6>
                                <p className="text-muted mb-0 small">Marwadi University, Rajkot, Gujarat</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">Email Address</h6>
                                <p className="text-muted mb-0 small">support@lms.com</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                <FaPhone size={20} />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">Phone Number</h6>
                                <p className="text-muted mb-0 small">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-top">
                            <h6 className="fw-bold mb-3">Follow Us</h6>
                            <div className="d-flex gap-3">
                                <Button variant="light" className="rounded-circle p-2 text-primary">
                                    <FaTwitter />
                                </Button>
                                <Button variant="light" className="rounded-circle p-2 text-primary">
                                    <FaFacebook />
                                </Button>
                                <Button variant="light" className="rounded-circle p-2 text-primary">
                                    <FaInstagram />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card className="p-4 border-0 shadow-sm rounded-4">
                        <h4 className="fw-bold mb-4">Send us a Message</h4>
                        {submitted && (
                            <div className="alert alert-success border-0 rounded-4 mb-4">
                                Thank you for your message! We'll get back to you as soon as possible.
                            </div>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Full Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                            className="rounded-3 p-3 bg-light border-0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Email Address</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                            className="rounded-3 p-3 bg-light border-0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold">Subject</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="What's this about?" 
                                            className="rounded-3 p-3 bg-light border-0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold">Message</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={5} 
                                            placeholder="Your message here..." 
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required 
                                            className="rounded-3 p-3 bg-light border-0"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Button type="submit" variant="primary" className="w-100 p-3 fw-bold rounded-4">
                                        Send Message
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
