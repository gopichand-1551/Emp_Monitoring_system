import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Droplet, Briefcase } from 'lucide-react';
import { employeeService } from '../services/employeeService';
import { leaveService } from '../services/leaveService';
import { taskService } from '../services/taskService';
import { timestampService } from '../services/timestampService';
import { formatDate, formatDateTime } from '../utils/formatDate';
import { STATUS_COLORS, STATUS_LABELS } from '../utils/constants';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [leaves, setLeaves] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
        const emp = employeeService.getById(id);
        if (emp) {
            setEmployee(emp);
            setLeaves(leaveService.getByEmployeeId(id));
            setTasks(taskService.getByEmployeeId(id));
            setTimestamps(timestampService.getByEmployeeId(id));
        } else {
            navigate('/admin/employees');
        }
    }, [id, navigate]);

    if (!employee) {
        return (
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-content flex-center">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="page-header">
                    <button className="btn btn-secondary" onClick={() => navigate('/admin/employees')}>
                        <ArrowLeft size={18} />
                        Back to Employees
                    </button>
                </div>

                <div className="employee-profile-header glass-card">
                    <div className="profile-avatar">
                        <span>{employee.name.charAt(0)}</span>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{employee.name}</h1>
                        <p className="profile-designation">{employee.designation}</p>
                        <div className="profile-details">
                            <div className="detail-item">
                                <Mail size={16} />
                                <span>{employee.email}</span>
                            </div>
                            <div className="detail-item">
                                <Phone size={16} />
                                <span>{employee.phone || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <Briefcase size={16} />
                                <span>{employee.team}</span>
                            </div>
                            <div className="detail-item">
                                <Calendar size={16} />
                                <span>Joined {formatDate(employee.joined_date)}</span>
                            </div>
                            <div className="detail-item">
                                <Droplet size={16} />
                                <span>Blood Group: {employee.blood_group || 'N/A'}</span>
                            </div>
                            {employee.address && (
                                <div className="detail-item">
                                    <MapPin size={16} />
                                    <span>{employee.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="details-grid">
                    <Card title="Leave History">
                        {leaves.length > 0 ? (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Dates</th>
                                            <th>Status</th>
                                            <th>Applied</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaves.map((leave) => (
                                            <tr key={leave.id}>
                                                <td className="capitalize">{leave.leave_type}</td>
                                                <td>{formatDate(leave.start_date)} - {formatDate(leave.end_date)}</td>
                                                <td>
                                                    <span className={`badge ${STATUS_COLORS[leave.status]}`}>
                                                        {STATUS_LABELS[leave.status]}
                                                    </span>
                                                </td>
                                                <td>{formatDate(leave.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted text-center">No leave records</p>
                        )}
                    </Card>

                    <Card title="Task History">
                        {tasks.length > 0 ? (
                            <div className="task-list">
                                {tasks.map((task) => (
                                    <div key={task.id} className="task-item">
                                        <div className="task-header">
                                            <h4 className="task-title">{task.title}</h4>
                                            <span className={`badge ${STATUS_COLORS[task.status]}`}>
                                                {STATUS_LABELS[task.status]}
                                            </span>
                                        </div>
                                        {task.description && (
                                            <p className="task-description">{task.description}</p>
                                        )}
                                        <p className="task-date text-sm text-muted">
                                            Assigned: {formatDate(task.assigned_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted text-center">No task records</p>
                        )}
                    </Card>

                    <Card title="Attendance History" className="full-width">
                        {timestamps.length > 0 ? (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Login</th>
                                            <th>Logout</th>
                                            <th>Duration</th>
                                            <th>Device</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timestamps.map((ts) => (
                                            <tr key={ts.id}>
                                                <td>{formatDate(ts.date)}</td>
                                                <td>{formatDateTime(ts.login_time)}</td>
                                                <td>{ts.logout_time ? formatDateTime(ts.logout_time) : 'Active'}</td>
                                                <td>{timestampService.formatDuration(ts.work_duration)}</td>
                                                <td className="text-sm text-muted">{ts.device_info}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-muted text-center">No attendance records</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
