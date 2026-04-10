import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { NotificationContext } from './context/NotificationContext';

// Layout & Components
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Pages
import Home from './pages/user/Home';
import BookDetails from './pages/user/BookDetails';
import MyBorrowedBooks from './pages/user/MyBorrowedBooks';
import BorrowHistory from './pages/user/BorrowHistory';
import Profile from './pages/user/Profile';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import Favorites from './pages/user/Favorites';
import NotificationHistory from './pages/user/NotificationHistory';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageUsers from './pages/admin/ManageUsers';
import BorrowRequests from './pages/admin/BorrowRequests';
import BorrowedBooks from './pages/admin/BorrowedBooks';

// Icons
import { FaCheckCircle, FaBell, FaExclamationTriangle } from 'react-icons/fa';

function ToastContainer({ toasts }) {
    const iconMap = {
        success: <FaCheckCircle className="text-success" />,
        info: <FaBell className="text-primary" />,
        warning: <FaExclamationTriangle className="text-warning" />,
    };
    return (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {toasts.map(toast => (
                <div key={toast.id} className="toast-notification animate-slide-left shadow-xl">
                    <div className="d-flex align-items-center gap-3 p-3">
                        <div>{iconMap[toast.type] || <FaBell className="text-primary" />}</div>
                        <div>
                            <div className="fw-bold small">{toast.title}</div>
                            <div className="text-muted extra-small">{toast.message}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Client-preview paths: admin can browse these and sidebar/admin-nav hides
const CLIENT_PREVIEW_PATHS = ['/home', '/book'];

function AppLayout() {
    const { user } = useContext(AuthContext);
    const { toasts } = useContext(NotificationContext);
    const location = useLocation();

    // Is admin browsing client-side pages?
    const isClientPreview = user?.role === 'admin' &&
        CLIENT_PREVIEW_PATHS.some(p => location.pathname.startsWith(p));

    // Show sidebar only for admin on admin pages
    const showAdminSidebar = user?.role === 'admin' && !isClientPreview;

    // Hide top navbar for admin when sidebar is showing (admin pages)
    const showTopNavbar = user && (!showAdminSidebar || isClientPreview);

    return (
        <>
            {user && <ToastContainer toasts={toasts} />}
            <div className="d-flex flex-column min-vh-100" style={{ background: '#f8fafc' }}>
                {showTopNavbar && <Navbar isClientPreview={isClientPreview} />}

                <div className={`d-flex flex-grow-1 ${showAdminSidebar ? 'admin-layout-wrapper' : ''}`} style={{ minHeight: 0 }}>
                    {showAdminSidebar && <AdminSidebar />}

                    <main className="flex-grow-1 w-100" style={{ minWidth: 0, overflowX: 'hidden' }}>
                        <div className={showAdminSidebar ? 'p-0 p-lg-0' : ''}>
                            <Routes>
                            <Route path="/" element={
                                user
                                    ? (user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/home" />)
                                    : <Navigate to="/login" />
                            } />

                            {/* Auth */}
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

                            {/* User Routes */}
                            {user?.role === 'user' && (
                                <>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/book/:id" element={<BookDetails />} />
                                    <Route path="/my-borrows" element={<MyBorrowedBooks />} />
                                    <Route path="/borrow-history" element={<BorrowHistory />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/notifications" element={<NotificationHistory />} />
                                </>
                            )}

                            {/* Admin Routes */}
                            {user?.role === 'admin' && (
                                <>
                                    <Route path="/admin/dashboard" element={<Dashboard />} />
                                    <Route path="/admin/manage-books" element={<ManageBooks />} />
                                    <Route path="/admin/manage-users" element={<ManageUsers />} />
                                    <Route path="/admin/borrow-requests" element={<BorrowRequests />} />
                                    <Route path="/admin/borrowed-books" element={<BorrowedBooks />} />
                                    {/* Client preview routes for admin */}
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/book/:id" element={<BookDetails />} />
                                </>
                            )}

                            <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

function App() {
    const { loading } = useContext(AuthContext);

    if (loading) return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
                <div className="text-muted fw-semibold">Loading Libro...</div>
            </div>
        </div>
    );

    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

export default App;
