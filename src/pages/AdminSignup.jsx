import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import cnLogo from '../assets/cn-logo.jpg';
import './AdminLogin.css';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 5) {
            setError('Password must be at least 5 characters long');
            return;
        }

        const result = signup(formData.name, formData.email, formData.password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error || 'Signup failed');
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
                    <p className="login-subtitle">Admin Signup</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="input"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-login">
                        <UserPlus size={18} />
                        Sign Up
                    </button>

                    <div className="login-hint">
                        <p className="text-muted text-sm">
                            Already have an account?{' '}
                            <Link to="/admin/login" className="signup-link">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
