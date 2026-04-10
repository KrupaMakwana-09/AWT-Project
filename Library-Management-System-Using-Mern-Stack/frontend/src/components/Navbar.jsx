import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { Navbar as BsNavbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { FaBookOpen, FaHeart, FaBell, FaSignOutAlt, FaUser, FaGlobe, FaTachometerAlt } from 'react-icons/fa';

const Navbar = ({ isClientPreview }) => {
    const { user, logout } = useContext(AuthContext);
    const { unreadCount } = useContext(NotificationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=ffffff&color=6366f1&size=80&bold=true`;

    const showClientLinks = user?.role === 'user' || isClientPreview;

    return (
        <BsNavbar expand="lg" variant="dark" className="main-navbar sticky-top border-0" expanded={expanded} onToggle={setExpanded}>
            <Container fluid className="px-3 px-lg-5">
                <div className="navbar-pill d-flex align-items-center justify-content-between w-100 px-4 py-2 rounded-pill shadow-xl mx-auto" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', maxWidth: '1200px' }}>
                    
                    {/* Brand */}
                    <Link to={user?.role === 'admin' && !isClientPreview ? '/admin/dashboard' : '/home'} className="navbar-brand d-flex align-items-center me-0 me-lg-4" onClick={() => setExpanded(false)}>
                        <div className="bg-white rounded-circle p-2 me-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                            <FaBookOpen className="text-primary" size={16} />
                        </div>
                        <span className="fw-black fs-5 text-white tracking-tight">Libro</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <BsNavbar.Toggle aria-controls="main-nav" className="border-0 shadow-none p-1 bg-white bg-opacity-10 rounded-3" style={{ color: 'white' }} />

                    {/* Nav Links */}
                    <BsNavbar.Collapse id="main-nav">
                        <Nav className="mx-auto align-items-center my-3 my-lg-0 gap-1">
                            {showClientLinks ? (
                                <>
                                    <Link to="/home" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/home') ? 'active' : ''}`}>Books</Link>
                                    <Link to="/my-borrows" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/my-borrows') ? 'active' : ''}`}>Borrows</Link>
                                    <Link to="/favorites" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/favorites') ? 'active' : ''}`}>
                                        <FaHeart size={13} className="me-1" />Favs
                                    </Link>
                                    <Link to="/about" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
                                    {isClientPreview && (
                                        <Link to="/admin/dashboard" onClick={() => setExpanded(false)} className="nav-pill-link ms-lg-2" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                            <FaTachometerAlt size={13} className="me-1" />Admin
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link to="/admin/dashboard" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/admin/dashboard') ? 'active' : ''}`}>
                                        <FaTachometerAlt size={13} className="me-1" />Dashboard
                                    </Link>
                                    <Link to="/home" onClick={() => setExpanded(false)} className={`nav-pill-link ${isActive('/home') ? 'active' : ''}`}>
                                        <FaGlobe size={13} className="me-1" />Website
                                    </Link>
                                </>
                            )}
                        </Nav>

                        <Nav className="align-items-center gap-2 my-2 my-lg-0">
                            {/* Notification Bell */}
                            <Link to="/notifications" onClick={() => setExpanded(false)} className="position-relative d-flex align-items-center justify-content-center text-white bg-white bg-opacity-10 rounded-circle p-2 transition-all hover-bg" style={{ width: '40px', height: '40px', textDecoration: 'none' }}>
                                <FaBell size={16} />
                                {unreadCount > 0 && (
                                    <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger border border-primary d-flex align-items-center justify-content-center" style={{ width: '18px', height: '18px', fontSize: '0.6rem', transform: 'translate(25%, -25%)' }}>
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </Link>

                            {/* Divider */}
                            <div className="vr bg-white bg-opacity-25 d-none d-lg-block" style={{ height: '28px' }}></div>

                            {/* Profile Dropdown */}
                            <Dropdown align="end">
                                <Dropdown.Toggle id="user-dropdown" className="d-flex align-items-center gap-2 bg-transparent border-0 p-0 shadow-none text-white user-toggle">
                                    <img src={avatarUrl} alt={user?.name} className="rounded-circle shadow-sm" style={{ width: '36px', height: '36px', border: '2px solid rgba(255,255,255,0.4)' }} />
                                    <div className="d-none d-lg-block text-start">
                                        <div className="fw-bold text-white lh-1" style={{ fontSize: '0.85rem' }}>{user?.name}</div>
                                        <div className="text-white-50 lh-1 mt-1 text-capitalize" style={{ fontSize: '0.65rem' }}>{user?.role}</div>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-xl border-0 rounded-4 mt-3 p-2 dropdown-menu-premium" style={{ minWidth: '230px' }}>
                                    <div className="px-3 py-3 text-center mb-2 rounded-4 bg-light">
                                        <img src={avatarUrl} alt={user?.name} className="rounded-circle mb-2 shadow-sm" style={{ width: '55px', height: '55px' }} />
                                        <div className="fw-bold text-dark">{user?.name}</div>
                                        <div className="text-muted extra-small">{user?.email}</div>
                                    </div>

                                    {user?.role === 'user' && (
                                        <Dropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)} className="rounded-3 d-flex align-items-center py-2 mb-1 fw-semibold">
                                            <FaUser className="me-2 text-primary" size={14} />Profile Settings
                                        </Dropdown.Item>
                                    )}
                                    {user?.role === 'user' && (
                                        <Dropdown.Item as={Link} to="/notifications" onClick={() => setExpanded(false)} className="rounded-3 d-flex align-items-center py-2 mb-1 fw-semibold">
                                            <FaBell className="me-2 text-warning" size={14} />
                                            Notifications {unreadCount > 0 && <span className="ms-auto badge bg-primary rounded-pill">{unreadCount}</span>}
                                        </Dropdown.Item>
                                    )}
                                    {user?.role === 'admin' && (
                                        <Dropdown.Item as={Link} to="/home" onClick={() => setExpanded(false)} className="rounded-3 d-flex align-items-center py-2 mb-1 fw-semibold text-primary">
                                            <FaGlobe className="me-2" size={14} />View Client Site
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Divider className="my-1" />

                                    <Dropdown.Item onClick={handleLogout} className="rounded-3 d-flex align-items-center py-2 text-danger fw-bold">
                                        <FaSignOutAlt className="me-2" size={14} />Sign Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </BsNavbar.Collapse>
                </div>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
