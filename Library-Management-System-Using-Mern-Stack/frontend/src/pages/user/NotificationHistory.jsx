import React, { useContext } from 'react';
import { Container, Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaTrash, FaBook, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { NotificationContext } from '../../context/NotificationContext';

const NotificationHistory = () => {
    const { notifications, markAsRead, markAllRead, deleteNotification, clearAll, unreadCount } = useContext(NotificationContext);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'success': return <FaCheckCircle className="text-success" size={18} />;
            case 'warning': return <FaExclamationTriangle className="text-warning" size={18} />;
            case 'info': return <FaBook className="text-primary" size={18} />;
            default: return <FaBell className="text-secondary" size={18} />;
        }
    };

    const getTypeBg = (type) => {
        switch (type) {
            case 'success': return 'bg-success bg-opacity-10';
            case 'warning': return 'bg-warning bg-opacity-10';
            default: return 'bg-primary bg-opacity-10';
        }
    };

    const timeAgo = (isoString) => {
        const diff = Date.now() - new Date(isoString).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)', minHeight: '100vh' }} className="py-5">
            <Container>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
                    <div>
                        <div className="d-flex align-items-center gap-3 mb-2">
                            <h1 className="fw-black text-dark mb-0">Notifications</h1>
                            {unreadCount > 0 && (
                                <Badge bg="primary" className="rounded-pill px-3 py-2 fs-6">{unreadCount} New</Badge>
                            )}
                        </div>
                        <p className="text-secondary mb-0">Stay updated with your latest library activities</p>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        {unreadCount > 0 && (
                            <Button variant="outline-primary" className="rounded-pill px-4 py-2 fw-bold" onClick={markAllRead}>
                                <FaCheckCircle className="me-2" />Mark All Read
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button variant="outline-danger" className="rounded-pill px-4 py-2 fw-bold" onClick={clearAll}>
                                <FaTrash className="me-2" />Clear All
                            </Button>
                        )}
                    </div>
                </div>

                {notifications.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                        {notifications.map((notif) => (
                            <Card
                                key={notif.id}
                                className={`border-0 shadow-sm rounded-4 overflow-hidden notification-card transition-all ${!notif.isRead ? 'border-start border-primary border-3' : ''}`}
                                style={{ borderLeft: !notif.isRead ? '4px solid #6366f1' : 'none' }}
                            >
                                <Card.Body className={`p-4 ${!notif.isRead ? 'bg-primary bg-opacity-5' : 'bg-white'}`}>
                                    <div className="d-flex align-items-start gap-3">
                                        <div className={`flex-shrink-0 p-3 rounded-4 ${getTypeBg(notif.type)}`}>
                                            {getTypeIcon(notif.type)}
                                        </div>
                                        <div className="flex-grow-1 min-width-0">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                                <div>
                                                    <h6 className="fw-bold mb-1">
                                                        {notif.title}
                                                        {!notif.isRead && <Badge bg="primary" className="ms-2 rounded-pill" style={{ fontSize: '0.6rem' }}>NEW</Badge>}
                                                    </h6>
                                                    <p className="text-secondary mb-0 small">{notif.message}</p>
                                                </div>
                                                <span className="text-muted extra-small flex-shrink-0 fw-bold">{timeAgo(notif.time)}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-1 flex-shrink-0">
                                            {!notif.isRead && (
                                                <Button variant="light" size="sm" className="rounded-circle p-2 border-0 text-primary" onClick={() => markAsRead(notif.id)} title="Mark as read">
                                                    <FaCheckCircle size={14} />
                                                </Button>
                                            )}
                                            <Button variant="light" size="sm" className="rounded-circle p-2 border-0 text-danger" onClick={() => deleteNotification(notif.id)} title="Delete">
                                                <FaTimes size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-0 shadow-sm rounded-5 text-center p-5 bg-white">
                        <div className="py-5">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                                <FaBell size={48} className="text-primary opacity-50" />
                            </div>
                            <h4 className="fw-black text-dark">You're all caught up!</h4>
                            <p className="text-secondary mx-auto" style={{ maxWidth: '400px' }}>
                                No notifications yet. We'll notify you when your borrow requests are approved or when new books arrive.
                            </p>
                        </div>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default NotificationHistory;
