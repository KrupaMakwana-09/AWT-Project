import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Notification = ({ notifications }) => {
    return (
        <ToastContainer className="p-3 notification-container" position="top-end">
            {notifications.map((msg, index) => (
                <Toast key={index} bg="info" className="text-white shadow">
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>{msg}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default Notification;
