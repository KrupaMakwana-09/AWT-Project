import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {
    FaTachometerAlt,
    FaBookOpen,
    FaUsers,
    FaTasks,
    FaClipboardList,
    FaSignOutAlt,
    FaGlobe,
    FaBars,
    FaTimes,
    FaBell,
    FaHistory
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

const AdminSidebar = () => {
    const { logout, user } = useContext(AuthContext);
    const { unreadCount } = useContext(NotificationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=6366f1&color=fff&size=80&bold=true`;

    const SidebarContent = () => (
        <div className="d-flex flex-column h-100">
            {/* Header */}
            <div className="px-4 py-5 border-bottom border-white border-opacity-10 position-relative border-0 shadow-sm">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-white rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                        <FaBookOpen className="text-primary animate-pulse" size={18} />
                    </div>
                    <div>
                        <div className="fw-black fs-5 text-white tracking-tighter">Libro</div>
                        <div className="extra-small text-white text-opacity-50 fw-bold tracking-widest text-uppercase">Management</div>
                    </div>
                </div>
                
                <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-4 border border-white border-opacity-10">
                    <img src={avatarUrl} alt={user?.name} className="rounded-circle shadow-sm" style={{ width: '40px', height: '40px', border: '2px solid rgba(255,255,255,0.2)' }} />
                    <div className="overflow-hidden">
                        <div className="fw-bold text-white lh-1 text-truncate" style={{ fontSize: '0.85rem' }}>{user?.name}</div>
                        <div className="mt-1" style={{ fontSize: '0.65rem' }}>
                            <span className="badge rounded-pill p-0 text-white text-opacity-75" style={{ fontSize: '0.6rem' }}>CHIEF LIBRARIAN</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="px-3 pt-4 flex-grow-1 overflow-auto">
                <p className="text-uppercase text-white px-3 mb-2" style={{ fontSize: '0.65rem', opacity: 0.8, letterSpacing: '0.15em', fontWeight: '900' }}>Main Menu</p>
                <Nav className="flex-column gap-1">
                    <NavLink to="/admin/dashboard" onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <FaTachometerAlt size={15} /><span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/manage-books" onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <FaBookOpen size={15} /><span>Manage Books</span>
                    </NavLink>
                    <NavLink to="/admin/manage-users" onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <FaUsers size={15} /><span>Manage Users</span>
                    </NavLink>
                </Nav>

                <div className="sidebar-group mb-5">
                    <div className="sidebar-header-text mb-3 px-4 text-white text-uppercase small fw-black tracking-widest opacity-85">Requests</div>
                    <Link to="/admin/borrow-requests" onClick={() => setMobileOpen(false)} className={`sidebar-link ${isActive('/admin/borrow-requests') ? 'active' : ''}`}>
                        <div className="sidebar-link-icon"><FaTasks /></div>
                        <span className="sidebar-link-text">Borrow Requests</span>
                    </Link>
                    <Link to="/notifications" onClick={() => setMobileOpen(false)} className={`sidebar-link ${isActive('/notifications') ? 'active' : ''}`}>
                        <div className="sidebar-link-icon position-relative">
                            <FaBell />
                            {unreadCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ width: '10px', height: '10px', padding: 0 }}></span>}
                        </div>
                        <span className="sidebar-link-text">System Alerts {unreadCount > 0 && `(${unreadCount})`}</span>
                    </Link>
                    <Link to="/admin/borrowed-books" onClick={() => setMobileOpen(false)} className={`sidebar-link ${isActive('/admin/borrowed-books') ? 'active' : ''}`}>
                        <div className="sidebar-link-icon"><FaHistory /></div>
                        <span className="sidebar-link-text">Loan Records</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 mt-auto border-top border-white border-opacity-10 d-flex flex-column gap-2">
                <Link
                    to="/home"
                    onClick={() => setMobileOpen(false)}
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 rounded-4 py-2 fw-black extra-small text-uppercase tracking-wider transition-all"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    <FaGlobe size={14} /> View Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-4 py-2 fw-black extra-small text-uppercase tracking-wider shadow-lg"
                >
                    <FaSignOutAlt size={14} /> Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="admin-mobile-toggle d-lg-none position-fixed btn btn-primary rounded-circle shadow-xl"
                style={{ bottom: '30px', left: '30px', width: '60px', height: '60px', zIndex: 1050, padding: 0, background: 'rgba(79, 70, 229, 0.9)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.2)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar drawer */}
            <div
                className={`admin-sidebar-mobile d-lg-none position-fixed top-0 start-0 h-100`}
                style={{
                    width: '260px',
                    zIndex: 1045,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'linear-gradient(180deg, #4f46e5 0%, #3730a3 100%)',
                    overflowY: 'auto'
                }}
            >
                <SidebarContent />
            </div>

            {/* Desktop Sidebar */}
            <div
                className="admin-sidebar d-none d-lg-flex flex-column"
                style={{
                    width: '260px',
                    minWidth: '260px',
                    minHeight: '100vh',
                    background: 'linear-gradient(180deg, #4f46e5 0%, #3730a3 100%)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
                }}
            >
                <SidebarContent />
            </div>
        </>
    );
};

export default AdminSidebar;
