import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Filter, Activity } from 'lucide-react';
import { timestampService } from '../services/timestampService';
import { employeeService } from '../services/employeeService';
import { formatDate, formatTime } from '../utils/formatDate';

const Timestamps = () => {
    const [timestamps, setTimestamps] = useState([]);
    const [filteredTimestamps, setFilteredTimestamps] = useState([]);
    const [filterEmployee, setFilterEmployee] = useState('all');
    const [filterDate, setFilterDate] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadTimestamps();
        setEmployees(employeeService.getAll());
    }, []);

    useEffect(() => {
        let filtered = timestamps;

        if (filterEmployee !== 'all') {
            filtered = filtered.filter(ts => ts.employee_id === parseInt(filterEmployee));
        }

        if (filterDate) {
            filtered = filtered.filter(ts => ts.date === filterDate);
        }

        setFilteredTimestamps(filtered);
    }, [filterEmployee, filterDate, timestamps]);

    const loadTimestamps = () => {
        const data = timestampService.getAll();
        setTimestamps(data);
        setFilteredTimestamps(data);
    };

    const activeUsers = timestampService.getActiveUsers();
    const avgWorkHours = timestampService.getAverageWorkHours();

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Timestamps</h1>
                        <p className="page-subtitle">Track employee login/logout times</p>
                    </div>
                </div>

                <div className="stats-grid" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div className="quick-stat-item">
                        <div className="quick-stat-label">
                            <Activity size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Active Now
                        </div>
                        <div className="quick-stat-value" style={{ color: 'var(--neon-green)' }}>
                            {activeUsers.length}
                        </div>
                    </div>
                    <div className="quick-stat-item">
                        <div className="quick-stat-label">Average Work Hours</div>
                        <div className="quick-stat-value" style={{ color: 'var(--neon-blue)' }}>
                            {avgWorkHours}h
                        </div>
                    </div>
                </div>

                <Card>
                    <div className="filter-bar">
                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                className="filter-select"
                                value={filterEmployee}
                                onChange={(e) => setFilterEmployee(e.target.value)}
                            >
                                <option value="all">All Employees</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <input
                                type="date"
                                className="filter-select"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Login Time</th>
                                    <th>Logout Time</th>
                                    <th>Work Duration</th>
                                    <th>Device Info</th>
                                    <th>IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTimestamps.map((ts) => (
                                    <tr key={ts.id}>
                                        <td className="font-semibold">{ts.employee_name}</td>
                                        <td>{formatDate(ts.date)}</td>
                                        <td>{formatTime(ts.login_time)}</td>
                                        <td>
                                            {ts.logout_time ? (
                                                formatTime(ts.logout_time)
                                            ) : (
                                                <span className="badge badge-success">Active</span>
                                            )}
                                        </td>
                                        <td>{timestampService.formatDuration(ts.work_duration)}</td>
                                        <td className="text-sm text-muted">{ts.device_info}</td>
                                        <td className="text-sm text-muted">{ts.ip_address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Timestamps;
