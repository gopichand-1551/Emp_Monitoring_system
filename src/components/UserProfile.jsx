import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, User } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    if (!user) return null;

    // Get user initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="user-profile">
            <div className="user-info">
                <div className="user-avatar">
                    {getInitials(user.name)}
                </div>
                <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                </div>
            </div>

            <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
    );
};

export default UserProfile;
