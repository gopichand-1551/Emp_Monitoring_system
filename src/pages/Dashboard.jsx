import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import { Users, Calendar, CheckSquare, Clock, TrendingUp } from 'lucide-react';
import { employeeService } from '../services/employeeService';
import { leaveService } from '../services/leaveService';
import { taskService } from '../services/taskService';
import { timestampService } from '../services/timestampService';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        employees: 0,
        pendingLeaves: 0,
        tasksToday: 0,
        activeUsers: 0
    });
    const [taskStats, setTaskStats] = useState(null);

    useEffect(() => {
        // Load statistics
        const employees = employeeService.getAll();
        const pendingLeaves = leaveService.getPending();
        const todayTasks = taskService.getToday();
        const activeUsers = timestampService.getActiveUsers();
        const taskCounts = taskService.getStatusCounts();

        setStats({
            employees: employees.length,
            pendingLeaves: pendingLeaves.length,
            tasksToday: todayTasks.length,
            activeUsers: activeUsers.length
        });

        setTaskStats(taskCounts);
    }, []);

    const taskChartData = taskStats ? [
        { name: 'Completed', value: taskStats.completed, color: '#10B981' },
        { name: 'In Progress', value: taskStats.in_progress, color: '#3B82F6' },
        { name: 'Pending', value: taskStats.pending, color: '#A855F7' }
    ] : [];

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">DASHBOARD</h1>
                        <p className="dashboard-subtitle">WELCOME TO EMPLOYEE MONITORING SYSTEM</p>
                    </div>
                </div>

                <div className="stats-grid">
                    <StatCard
                        title="Total Employees"
                        value={stats.employees}
                        icon={Users}
                        gradient="primary"
                    />
                    <StatCard
                        title="Pending Leaves"
                        value={stats.pendingLeaves}
                        icon={Calendar}
                        gradient="accent"
                    />
                    <StatCard
                        title="Tasks Today"
                        value={stats.tasksToday}
                        icon={CheckSquare}
                        gradient="secondary"
                    />
                    <StatCard
                        title="Active Now"
                        value={stats.activeUsers}
                        icon={Clock}
                        gradient="primary"
                    />
                </div>

                <div className="dashboard-grid">
                    <Card title="Task Status Distribution" glow>
                        <div className="chart-container">
                            {taskStats && taskStats.total > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={taskChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {taskChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="empty-state">
                                    <p className="text-muted">No task data available</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card title="Quick Stats" glow>
                        <div className="quick-stats">
                            <div className="quick-stat-item">
                                <div className="quick-stat-label">Total Tasks</div>
                                <div className="quick-stat-value">{taskStats?.total || 0}</div>
                            </div>
                            <div className="quick-stat-item">
                                <div className="quick-stat-label">Completed</div>
                                <div className="quick-stat-value text-success">{taskStats?.completed || 0}</div>
                            </div>
                            <div className="quick-stat-item">
                                <div className="quick-stat-label">In Progress</div>
                                <div className="quick-stat-value text-info">{taskStats?.in_progress || 0}</div>
                            </div>
                            <div className="quick-stat-item">
                                <div className="quick-stat-label">Pending</div>
                                <div className="quick-stat-value text-warning">{taskStats?.pending || 0}</div>
                            </div>
                            <div className="quick-stat-item">
                                <div className="quick-stat-label">Avg Work Hours</div>
                                <div className="quick-stat-value">{timestampService.getAverageWorkHours()}h</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
