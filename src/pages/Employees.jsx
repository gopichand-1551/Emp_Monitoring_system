import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { employeeService } from '../services/employeeService';
import { formatDate } from '../utils/formatDate';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        designation: '',
        team: '',
        blood_group: '',
        joined_date: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredEmployees(employeeService.search(searchQuery));
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchQuery, employees]);

    const loadEmployees = () => {
        const data = employeeService.getAll();
        setEmployees(data);
        setFilteredEmployees(data);
    };

    const handleAdd = () => {
        setEditingEmployee(null);
        setFormData({
            name: '',
            email: '',
            designation: '',
            team: '',
            blood_group: '',
            joined_date: '',
            phone: '',
            address: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData(employee);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            employeeService.delete(id);
            loadEmployees();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEmployee) {
            employeeService.update(editingEmployee.id, formData);
        } else {
            employeeService.create(formData);
        }
        setIsModalOpen(false);
        loadEmployees();
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Employees</h1>
                        <p className="page-subtitle">Manage employee records</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleAdd}>
                        <Plus size={18} />
                        Add Employee
                    </button>
                </div>

                <Card>
                    <div className="search-bar">
                        <Search size={18} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, email, designation, or team..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Designation</th>
                                    <th>Team</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td className="font-semibold">{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.team}</td>
                                        <td>{formatDate(employee.joined_date)}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-icon btn-icon-info"
                                                    onClick={() => navigate(`/admin/employees/${employee.id}`)}
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="btn-icon btn-icon-primary"
                                                    onClick={() => handleEdit(employee)}
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="btn-icon btn-icon-danger"
                                                    onClick={() => handleDelete(employee.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
                    size="lg"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    className="input"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Designation</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Team</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="team"
                                    value={formData.team}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Blood Group</label>
                                <input
                                    type="text"
                                    className="input"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Joined Date</label>
                                <input
                                    type="date"
                                    className="input"
                                    name="joined_date"
                                    value={formData.joined_date}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="input"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group form-group-full">
                                <label className="form-label">Address</label>
                                <textarea
                                    className="input"
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingEmployee ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default Employees;
