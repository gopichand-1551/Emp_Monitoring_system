import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import cnLogo from '../assets/cn-logo.jpg';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(email, password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <div className="login-container animated-bg">
            <div className="login-card glass-card">
                <div className="login-header">
                    <div className="login-logo">
                        <img src={cnLogo} alt="CN Technologies" className="logo-image" />
                    </div>
                    <h1 className="login-title gradient-text">Employee Monitor</h1>
                    <p className="login-subtitle">Admin Login</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-login">
                        <LogIn size={18} />
                        Sign In
                    </button>

                    <div className="login-hint">
                        <p className="text-muted text-sm">Demo credentials: gopi@1551 / 12345</p>
                        <p className="text-muted text-sm">
                            Don't have an account?{' '}
                            <Link to="/admin/signup" className="signup-link">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
