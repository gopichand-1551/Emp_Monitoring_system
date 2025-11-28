import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Leaves from './pages/Leaves';
import Tasks from './pages/Tasks';
import Timestamps from './pages/Timestamps';
import './pages/SharedStyles.css';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/signup" element={<AdminSignup />} />

                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/employees"
                            element={
                                <ProtectedRoute>
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/employees/:id"
                            element={
                                <ProtectedRoute>
                                    <EmployeeDetails />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/leaves"
                            element={
                                <ProtectedRoute>
                                    <Leaves />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/tasks"
                            element={
                                <ProtectedRoute>
                                    <Tasks />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/timestamps"
                            element={
                                <ProtectedRoute>
                                    <Timestamps />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
