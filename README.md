# Employee Monitoring System - Admin Dashboard

A modern, feature-rich admin dashboard for employee monitoring built with React, featuring a stunning dark theme with neon gradients and glassmorphism design.

## Features

### 🔐 Authentication
- Static admin login (email: `gopi@1551`, password: `12345`)
- Session-based authentication
- Protected routes

### 👥 Employee Management
- View all employees
- Add new employees
- Edit employee details
- Delete employees
- View detailed employee profiles with:
  - Personal information
  - Leave history
  - Task history
  - Attendance records

### 📅 Leave Management
- View all leave requests
- Filter by status (pending, approved, rejected)
- Approve or reject leave requests
- View leave statistics

### ✅ Task Monitoring
- View all tasks
- Filter by status and employee
- Task status distribution chart
- Daily task tracking
- Task statistics (pending, in progress, completed)

### ⏰ Timestamp Tracking
- View employee login/logout times
- Track work duration
- View device and IP information
- Filter by employee and date
- Active user count
- Average work hours calculation

## Design Features

- **Dark Theme**: Navy blue background (#0F1020, #111327)
- **Neon Gradients**: Purple, cyan, blue, and pink accents
- **Glassmorphism**: Frosted glass effect on cards
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Typography**: Inter font family from Google Fonts

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Storage**: Local Storage (mock data)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd c:\Cogninode\Emp_moniter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Default Login Credentials

- **Email**: `gopi@1551`
- **Password**: `12345`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Card.jsx         # Glassmorphic card component
│   ├── StatCard.jsx     # Dashboard stat cards
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── Modal.jsx        # Modal dialog
│   └── ProtectedRoute.jsx
├── context/             # React context
│   └── AuthContext.jsx  # Authentication context
├── pages/               # Page components
│   ├── AdminLogin.jsx   # Login page
│   ├── Dashboard.jsx    # Main dashboard
│   ├── Employees.jsx    # Employee list & management
│   ├── EmployeeDetails.jsx
│   ├── Leaves.jsx       # Leave management
│   ├── Tasks.jsx        # Task monitoring
│   └── Timestamps.jsx   # Attendance tracking
├── services/            # Data services
│   ├── authService.js
│   ├── employeeService.js
│   ├── leaveService.js
│   ├── taskService.js
│   ├── timestampService.js
│   └── mockData.js      # Initial mock data
├── utils/               # Utility functions
│   ├── formatDate.js
│   └── constants.js
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Data Persistence

All data is stored in browser's Local Storage:
- `employees_data` - Employee records
- `leaves_data` - Leave requests
- `tasks_data` - Task records
- `timestamps_data` - Attendance records
- `admin_session` - Session data (Session Storage)

## Features Overview

### Dashboard
- Total employees count
- Pending leaves count
- Today's tasks count
- Active users count
- Task status distribution pie chart
- Quick statistics

### Employees Page
- Search functionality (name, email, designation, team)
- Add/Edit/Delete operations
- View detailed employee information

### Leaves Page
- Filter by status
- Approve/Reject actions
- Statistics (pending, approved, rejected)

### Tasks Page
- Filter by status and employee
- Bar chart visualization
- Task status tracking

### Timestamps Page
- Filter by employee and date
- Active users indicator
- Average work hours
- Work duration calculations

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

When ready to connect to a backend:
1. Replace service files with API calls
2. Implement JWT token management
3. Add refresh token logic
4. Connect to MySQL database via FastAPI

## License

This project is for demonstration purposes.

## Support

For any issues or questions, please contact the development team.
