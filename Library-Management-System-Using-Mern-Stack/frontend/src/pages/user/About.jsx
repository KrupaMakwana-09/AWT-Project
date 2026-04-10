import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaUsers, FaHistory, FaAward } from 'react-icons/fa';

const About = () => {
    return (
        <Container className="py-5 animate-fade-in">
            <Row className="justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h1 className="fw-bold text-primary mb-3">About Our Library</h1>
                    <p className="lead text-secondary">
                        Welcome to LMS, the modern solution for library management. We are dedicated to providing 
                        a seamless experience for book lovers and researchers alike.
                    </p>
                </Col>
            </Row>

            <Row className="g-4 mb-5">
                <Col md={3}>
                    <Card className="h-100 text-center p-4 border-0 shadow-sm hover-up">
                        <div className="mb-3 text-primary">
                            <FaBook size={40} />
                        </div>
                        <h4 className="fw-bold">10,000+</h4>
                        <p className="text-muted mb-0">Total Books</p>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100 text-center p-4 border-0 shadow-sm hover-up">
                        <div className="mb-3 text-success">
                            <FaUsers size={40} />
                        </div>
                        <h4 className="fw-bold">5,000+</h4>
                        <p className="text-muted mb-0">Active Users</p>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100 text-center p-4 border-0 shadow-sm hover-up">
                        <div className="mb-3 text-warning">
                            <FaHistory size={40} />
                        </div>
                        <h4 className="fw-bold">24/7</h4>
                        <p className="text-muted mb-0">Online Access</p>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100 text-center p-4 border-0 shadow-sm hover-up">
                        <div className="mb-3 text-info">
                            <FaAward size={40} />
                        </div>
                        <h4 className="fw-bold">Top Rated</h4>
                        <p className="text-muted mb-0">Library Service</p>
                    </Card>
                </Col>
            </Row>

            <Row className="align-items-center mt-5">
                <Col md={6}>
                    <img 
                        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                        alt="Library" 
                        className="img-fluid rounded-4 shadow-lg"
                    />
                </Col>
                <Col md={6} className="ps-md-5 mt-4 mt-md-0">
                    <h2 className="fw-bold mb-4">Our Mission</h2>
                    <p className="text-secondary">
                        Our mission is to foster a community of lifelong learners by providing easy access to 
                        information, resources, and technology. We believe that knowledge should be accessible 
                         to everyone, everywhere.
                    </p>
                    <p className="text-secondary">
                        With our modern LMS system, we've digitized our catalog, making it easier than ever 
                        to find your next favorite read, track your borrow history, and discover new titles.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
