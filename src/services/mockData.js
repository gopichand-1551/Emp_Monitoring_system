// Mock employee data
export const mockEmployees = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@company.com',
    designation: 'Senior Developer',
    team: 'Engineering',
    blood_group: 'O+',
    joined_date: '2022-01-15',
    phone: '+91 98765 43210',
    address: '123, MG Road, Bangalore, Karnataka',
    created_at: '2022-01-15T09:00:00',
    updated_at: '2025-11-20T10:30:00'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    designation: 'UI/UX Designer',
    team: 'Design',
    blood_group: 'A+',
    joined_date: '2022-03-20',
    phone: '+91 98765 43211',
    address: '456, Park Street, Mumbai, Maharashtra',
    created_at: '2022-03-20T09:00:00',
    updated_at: '2025-11-20T10:30:00'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.kumar@company.com',
    designation: 'DevOps Engineer',
    team: 'Engineering',
    blood_group: 'B+',
    joined_date: '2021-11-10',
    phone: '+91 98765 43212',
    address: '789, Cyber City, Hyderabad, Telangana',
    created_at: '2021-11-10T09:00:00',
    updated_at: '2025-11-20T10:30:00'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.com',
    designation: 'Product Manager',
    team: 'Product',
    blood_group: 'AB+',
    joined_date: '2023-02-01',
    phone: '+91 98765 43213',
    address: '321, Tech Park, Pune, Maharashtra',
    created_at: '2023-02-01T09:00:00',
    updated_at: '2025-11-20T10:30:00'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    designation: 'QA Engineer',
    team: 'Quality Assurance',
    blood_group: 'O-',
    joined_date: '2022-07-15',
    phone: '+91 98765 43214',
    address: '654, IT Hub, Chennai, Tamil Nadu',
    created_at: '2022-07-15T09:00:00',
    updated_at: '2025-11-20T10:30:00'
  }
];

// Mock leave requests
export const mockLeaves = [
  {
    id: 1,
    employee_id: 1,
    employee_name: 'Rahul Sharma',
    leave_type: 'sick',
    start_date: '2025-12-01',
    end_date: '2025-12-02',
    reason: 'Feeling unwell, need rest',
    status: 'pending',
    approver_id: null,
    created_at: '2025-11-25T10:30:00',
    updated_at: '2025-11-25T10:30:00'
  },
  {
    id: 2,
    employee_id: 2,
    employee_name: 'Priya Patel',
    leave_type: 'casual',
    start_date: '2025-12-05',
    end_date: '2025-12-05',
    reason: 'Personal work',
    status: 'approved',
    approver_id: 1,
    created_at: '2025-11-20T09:00:00',
    updated_at: '2025-11-22T14:30:00'
  },
  {
    id: 3,
    employee_id: 3,
    employee_name: 'Amit Kumar',
    leave_type: 'vacation',
    start_date: '2025-12-20',
    end_date: '2025-12-27',
    reason: 'Family vacation planned',
    status: 'pending',
    approver_id: null,
    created_at: '2025-11-24T11:00:00',
    updated_at: '2025-11-24T11:00:00'
  },
  {
    id: 4,
    employee_id: 4,
    employee_name: 'Sneha Reddy',
    leave_type: 'sick',
    start_date: '2025-11-28',
    end_date: '2025-11-29',
    reason: 'Medical checkup',
    status: 'rejected',
    approver_id: 1,
    created_at: '2025-11-26T08:00:00',
    updated_at: '2025-11-26T16:00:00'
  }
];

// Mock tasks
export const mockTasks = [
  {
    id: 1,
    employee_id: 1,
    employee_name: 'Rahul Sharma',
    title: 'Implement user authentication module',
    description: 'Create JWT-based authentication system with login and signup',
    status: 'completed',
    assigned_date: '2025-11-20',
    created_at: '2025-11-20T09:00:00',
    updated_at: '2025-11-27T15:30:00'
  },
  {
    id: 2,
    employee_id: 1,
    employee_name: 'Rahul Sharma',
    title: 'Database schema design',
    description: 'Design and implement MySQL database schema for employee management',
    status: 'in_progress',
    assigned_date: '2025-11-27',
    created_at: '2025-11-27T09:00:00',
    updated_at: '2025-11-27T14:00:00'
  },
  {
    id: 3,
    employee_id: 2,
    employee_name: 'Priya Patel',
    title: 'Design dashboard mockups',
    description: 'Create high-fidelity mockups for admin dashboard with dark theme',
    status: 'completed',
    assigned_date: '2025-11-25',
    created_at: '2025-11-25T10:00:00',
    updated_at: '2025-11-26T17:00:00'
  },
  {
    id: 4,
    employee_id: 3,
    employee_name: 'Amit Kumar',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated deployment pipeline for frontend and backend',
    status: 'in_progress',
    assigned_date: '2025-11-26',
    created_at: '2025-11-26T09:00:00',
    updated_at: '2025-11-27T11:00:00'
  },
  {
    id: 5,
    employee_id: 4,
    employee_name: 'Sneha Reddy',
    title: 'Product requirements documentation',
    description: 'Document all feature requirements and user stories',
    status: 'pending',
    assigned_date: '2025-11-27',
    created_at: '2025-11-27T10:00:00',
    updated_at: '2025-11-27T10:00:00'
  },
  {
    id: 6,
    employee_id: 5,
    employee_name: 'Vikram Singh',
    title: 'Write test cases for leave module',
    description: 'Create comprehensive test cases for leave approval workflow',
    status: 'in_progress',
    assigned_date: '2025-11-26',
    created_at: '2025-11-26T11:00:00',
    updated_at: '2025-11-27T09:30:00'
  }
];

// Mock timestamps
export const mockTimestamps = [
  {
    id: 1,
    employee_id: 1,
    employee_name: 'Rahul Sharma',
    login_time: '2025-11-27T09:00:00',
    logout_time: '2025-11-27T18:30:00',
    device_info: 'Windows 11 - Chrome 120',
    ip_address: '192.168.1.101',
    work_duration: 570,
    date: '2025-11-27'
  },
  {
    id: 2,
    employee_id: 2,
    employee_name: 'Priya Patel',
    login_time: '2025-11-27T09:15:00',
    logout_time: '2025-11-27T18:00:00',
    device_info: 'MacOS - Safari 17',
    ip_address: '192.168.1.102',
    work_duration: 525,
    date: '2025-11-27'
  },
  {
    id: 3,
    employee_id: 3,
    employee_name: 'Amit Kumar',
    login_time: '2025-11-27T08:45:00',
    logout_time: '2025-11-27T17:45:00',
    device_info: 'Ubuntu 22.04 - Firefox 121',
    ip_address: '192.168.1.103',
    work_duration: 540,
    date: '2025-11-27'
  },
  {
    id: 4,
    employee_id: 4,
    employee_name: 'Sneha Reddy',
    login_time: '2025-11-27T10:00:00',
    logout_time: null,
    device_info: 'Windows 11 - Edge 120',
    ip_address: '192.168.1.104',
    work_duration: null,
    date: '2025-11-27'
  },
  {
    id: 5,
    employee_id: 5,
    employee_name: 'Vikram Singh',
    login_time: '2025-11-27T09:30:00',
    logout_time: '2025-11-27T18:15:00',
    device_info: 'MacOS - Chrome 120',
    ip_address: '192.168.1.105',
    work_duration: 525,
    date: '2025-11-27'
  },
  {
    id: 6,
    employee_id: 1,
    employee_name: 'Rahul Sharma',
    login_time: '2025-11-26T09:05:00',
    logout_time: '2025-11-26T18:20:00',
    device_info: 'Windows 11 - Chrome 120',
    ip_address: '192.168.1.101',
    work_duration: 555,
    date: '2025-11-26'
  }
];
