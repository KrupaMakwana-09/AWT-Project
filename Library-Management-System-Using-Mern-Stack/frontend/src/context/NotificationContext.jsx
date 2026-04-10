import React, { createContext, useState, useEffect, useContext } from 'react';
import { socket } from '../socket/socket';
import { AuthContext } from './AuthContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('lib_notifications') || '[]');
        } catch {
            return [];
        }
    });
    const [toasts, setToasts] = useState([]);

    // Persist notifications to localStorage
    useEffect(() => {
        localStorage.setItem('lib_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (title, message, type = 'info') => {
        const notif = {
            id: Date.now(),
            title,
            message,
            type,
            time: new Date().toISOString(),
            isRead: false
        };
        setNotifications(prev => [notif, ...prev]);
        // Also show a toast
        setToasts(prev => [...prev, notif]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== notif.id));
        }, 5000);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
        localStorage.removeItem('lib_notifications');
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Socket listeners
    useEffect(() => {
        if (!user) return;
        socket.connect();

        socket.on('borrowRequest', (data) => {
            if (user?.role === 'admin') {
                addNotification('New Borrow Request', `${data.user.name} requested "${data.book.title}"`, 'info');
            }
        });

        socket.on('borrowApproved', (data) => {
            if (user?._id === data.user._id || user?.role === 'user') {
                addNotification('Request Approved! 🎉', `Your request for "${data.book.title}" has been approved!`, 'success');
            }
        });

        socket.on('bookReturned', (data) => {
            if (user?.role === 'admin') {
                addNotification('Book Returned', `${data.user.name} returned "${data.book.title}"`, 'info');
            }
        });

        socket.on('newBookAdded', (data) => {
            addNotification('New Book Added', `"${data.title}" by ${data.author} is now available.`, 'info');
        });

        return () => {
            socket.off('borrowRequest');
            socket.off('borrowApproved');
            socket.off('bookReturned');
            socket.off('newBookAdded');
        };
    }, [user]);

    return (
        <NotificationContext.Provider value={{
            notifications,
            toasts,
            unreadCount,
            addNotification,
            markAsRead,
            markAllRead,
            deleteNotification,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
