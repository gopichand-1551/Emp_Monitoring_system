import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    CheckSquare,
    Clock,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import cnLogo from '../assets/cn-logo.jpg';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/employees', icon: Users, label: 'Employees' },
        { path: '/admin/leaves', icon: Calendar, label: 'Leave Requests' },
        { path: '/admin/tasks', icon: CheckSquare, label: 'Tasks' },
        { path: '/admin/timestamps', icon: Clock, label: 'Timestamps' }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src={cnLogo} alt="CN Technologies" className="logo-image" />
                    <h2 className="logo-text gradient-text">EMPLOYEE MONITORING SYSTEM</h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-item logout-btn" onClick={logout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
