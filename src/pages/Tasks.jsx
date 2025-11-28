import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Filter } from 'lucide-react';
import { taskService } from '../services/taskService';
import { employeeService } from '../services/employeeService';
import { formatDate } from '../utils/formatDate';
import { STATUS_COLORS, STATUS_LABELS } from '../utils/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterEmployee, setFilterEmployee] = useState('all');
    const [employees, setEmployees] = useState([]);
    const [taskStats, setTaskStats] = useState(null);

    useEffect(() => {
        loadTasks();
        setEmployees(employeeService.getAll());
        setTaskStats(taskService.getStatusCounts());
    }, []);

    useEffect(() => {
        let filtered = tasks;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(task => task.status === filterStatus);
        }

        if (filterEmployee !== 'all') {
            filtered = filtered.filter(task => task.employee_id === parseInt(filterEmployee));
        }

        setFilteredTasks(filtered);
    }, [filterStatus, filterEmployee, tasks]);

    const loadTasks = () => {
        const data = taskService.getAll();
        setTasks(data);
        setFilteredTasks(data);
    };

    const chartData = taskStats ? [
        { name: 'Pending', count: taskStats.pending, fill: '#A855F7' },
        { name: 'In Progress', count: taskStats.in_progress, fill: '#3B82F6' },
        { name: 'Completed', count: taskStats.completed, fill: '#10B981' }
    ] : [];

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Tasks</h1>
                        <p className="page-subtitle">Monitor daily task progress</p>
                    </div>
                </div>

                <Card title="Task Overview" glow style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    background: '#1a1d3a',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" name="Tasks" fill="#A855F7" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <div className="filter-bar">
                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                className="filter-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="filter-group">
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
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Employee</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Assigned Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task) => (
                                    <tr key={task.id}>
                                        <td className="font-semibold">{task.title}</td>
                                        <td>{task.employee_name}</td>
                                        <td className="max-width-300">{task.description}</td>
                                        <td>
                                            <span className={`badge ${STATUS_COLORS[task.status]}`}>
                                                {STATUS_LABELS[task.status]}
                                            </span>
                                        </td>
                                        <td>{formatDate(task.assigned_date)}</td>
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

export default Tasks;
