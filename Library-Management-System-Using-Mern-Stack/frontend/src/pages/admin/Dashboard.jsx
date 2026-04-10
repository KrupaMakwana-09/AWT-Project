import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container, Badge } from 'react-bootstrap';
import { FaBook, FaUsers, FaClock, FaChartLine, FaExclamationCircle, FaShieldAlt } from 'react-icons/fa';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalUsers: 0,
        totalBorrows: 0,
        activeBorrows: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Catalog', value: stats.totalBooks, icon: <FaBook />, color: '#6366f1', sub: 'Books in library' },
        { title: 'User Base', value: stats.totalUsers, icon: <FaUsers />, color: '#10b981', sub: 'Active members' },
        { title: 'Borrow History', value: stats.totalBorrows, icon: <FaClock />, color: '#f59e0b', sub: 'Historical records' },
        { title: 'Currently Out', value: stats.activeBorrows, icon: <FaChartLine />, color: '#ef4444', sub: 'Active loans' },
    ];

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }} className="animate-fade-in p-4 p-lg-5">
            <Container fluid>
                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h1 className="fw-black mb-1 text-dark tracking-tighter" style={{ fontSize: '2.5rem' }}>
                            Welcome back, Admin!
                        </h1>
                        <p className="text-secondary mb-0 fw-medium">
                            Here's what's happening in your library today.
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Badge bg="white" className="text-primary border p-3 border-2 rounded-4 shadow-sm fw-bold">
                           <FaClock className="me-2" /> {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </Badge>
                    </div>
                </div>

                {/* Stats Cards */}
                <Row className="g-4 mb-5">
                    {cards.map((card, idx) => (
                        <Col md={6} lg={3} key={idx}>
                            <Card className="border-0 shadow-sm rounded-5 h-100 overflow-hidden transition-all hover-scale" style={{ background: 'white' }}>
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div className="p-4 rounded-4 text-white shadow-lg" style={{ backgroundColor: card.color, background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)` }}>
                                            {React.cloneElement(card.icon, { size: 24 })}
                                        </div>
                                        <Badge bg="light" className="text-dark fw-bold rounded-pill p-2 px-3 border border-dark border-opacity-10">
                                            Live
                                        </Badge>
                                    </div>
                                    <div className="fw-heavy text-muted extra-small text-uppercase tracking-wider mb-1">{card.title}</div>
                                    <h2 className="mb-1 fw-black fs-1 text-dark tracking-tight">{card.value}</h2>
                                    <div className="text-secondary small fw-black">{card.sub}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Main Content Area */}
                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-5 p-4 p-md-5 text-white position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', minHeight: '350px' }}>
                            <div className="position-absolute top-0 end-0 p-5 mt-4 opacity-10 d-none d-md-block" style={{ transform: 'rotate(15deg)' }}>
                                <FaShieldAlt size={220} />
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }} className="h-100 d-flex flex-column">
                                <Badge bg="white" className="text-primary px-3 py-2 rounded-pill fw-black mb-4 d-inline-block shadow-sm" style={{ width: 'fit-content' }}>
                                    ADMIN CONSOLE
                                </Badge>
                                <h2 className="fw-black mb-4 display-5 tracking-tighter">Library Quick Guide</h2>
                                <p className="fs-5 text-white mb-5 lh-lg fw-medium" style={{ maxWidth: '600px' }}>
                                    You have full control over the library ecosystem. Update the catalog, manage members, 
                                    and process borrow requests in real-time. Everything is designed for maximum efficiency.
                                </p>
                                <div className="d-flex gap-3 mt-auto">
                                    <button className="btn btn-white bg-white text-primary fw-black px-4 py-3 rounded-4 border-0 shadow-lg transition-all hover-scale">
                                        View All Books
                                    </button>
                                    <button className="btn btn-white glass text-white fw-bold px-4 py-3 rounded-4 border-0 transition-all hover-bg">
                                        Check Requests
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0 shadow-lg rounded-5 p-4 bg-dark text-white h-100 overflow-hidden">
                            <h4 className="fw-black mb-5 tracking-tight d-flex align-items-center">
                                <span className="p-2 bg-success rounded-3 me-3 animate-pulse"></span>
                                System Status
                            </h4>
                            
                            <div className="mb-4 d-flex align-items-center p-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-10">
                                <div className="p-3 bg-white bg-opacity-10 rounded-3 me-3">
                                    <FaChartLine className="text-success" />
                                </div>
                                <div>
                                    <div className="fw-black fs-6 text-white">Backend Online</div>
                                    <div className="extra-small text-success fw-bold">Latency: 24ms</div>
                                </div>
                            </div>

                            <div className="mb-4 d-flex align-items-center p-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-10">
                                <div className="p-3 bg-white bg-opacity-10 rounded-3 me-3">
                                    <FaShieldAlt className="text-info" />
                                </div>
                                <div>
                                    <div className="fw-bold fs-6">Database Secured</div>
                                    <div className="extra-small text-info fw-bold">Synced: Real-time</div>
                                </div>
                            </div>

                            <hr className="opacity-10 my-4" />
                            
                            <div className="p-4 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-20 mt-auto">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <FaExclamationCircle className="text-warning animate-bounce-in" />
                                    <span className="small fw-black text-uppercase tracking-wider">Quick Note</span>
                                </div>
                                <p className="small mb-0 text-white text-opacity-75 fw-medium">
                                    Processing membership blocks and book returns immediately improves catalog accuracy for all readers.
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
