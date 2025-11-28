import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { Check, X, Filter } from 'lucide-react';
import { leaveService } from '../services/leaveService';
import { formatDate } from '../utils/formatDate';
import { STATUS_COLORS, STATUS_LABELS } from '../utils/constants';

const Leaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadLeaves();
    }, []);

    useEffect(() => {
        if (filterStatus === 'all') {
            setFilteredLeaves(leaves);
        } else {
            setFilteredLeaves(leaveService.filterByStatus(filterStatus));
        }
    }, [filterStatus, leaves]);

    const loadLeaves = () => {
        const data = leaveService.getAll();
        setLeaves(data);
        setFilteredLeaves(data);
    };

    const handleApprove = (id) => {
        if (window.confirm('Approve this leave request?')) {
            leaveService.approve(id);
            loadLeaves();
        }
    };

    const handleReject = (id) => {
        if (window.confirm('Reject this leave request?')) {
            leaveService.reject(id);
            loadLeaves();
        }
    };

    const pendingCount = leaves.filter(l => l.status === 'pending').length;
    const approvedCount = leaves.filter(l => l.status === 'approved').length;
    const rejectedCount = leaves.filter(l => l.status === 'rejected').length;

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Leave Requests</h1>
                        <p className="page-subtitle">Manage employee leave applications</p>
                    </div>
                </div>

                <div className="stats-grid" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <div className="quick-stat-item">
                        <div className="quick-stat-label">Pending</div>
                        <div className="quick-stat-value" style={{ color: 'var(--neon-purple)' }}>{pendingCount}</div>
                    </div>
                    <div className="quick-stat-item">
                        <div className="quick-stat-label">Approved</div>
                        <div className="quick-stat-value" style={{ color: 'var(--neon-green)' }}>{approvedCount}</div>
                    </div>
                    <div className="quick-stat-item">
                        <div className="quick-stat-label">Rejected</div>
                        <div className="quick-stat-value" style={{ color: '#EF4444' }}>{rejectedCount}</div>
                    </div>
                </div>

                <Card>
                    <div className="filter-bar">
                        <div className="filter-group">
                            <Filter size={18} />
                            <select
                                className="filter-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Requests</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Applied On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeaves.map((leave) => (
                                    <tr key={leave.id}>
                                        <td className="font-semibold">{leave.employee_name}</td>
                                        <td className="capitalize">{leave.leave_type}</td>
                                        <td>{formatDate(leave.start_date)}</td>
                                        <td>{formatDate(leave.end_date)}</td>
                                        <td className="max-width-200">{leave.reason}</td>
                                        <td>
                                            <span className={`badge ${STATUS_COLORS[leave.status]}`}>
                                                {STATUS_LABELS[leave.status]}
                                            </span>
                                        </td>
                                        <td>{formatDate(leave.created_at)}</td>
                                        <td>
                                            {leave.status === 'pending' && (
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-icon btn-icon-success"
                                                        onClick={() => handleApprove(leave.id)}
                                                        title="Approve"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        className="btn-icon btn-icon-danger"
                                                        onClick={() => handleReject(leave.id)}
                                                        title="Reject"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}
                                            {leave.status !== 'pending' && (
                                                <span className="text-muted text-sm">-</span>
                                            )}
                                        </td>
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

export default Leaves;
