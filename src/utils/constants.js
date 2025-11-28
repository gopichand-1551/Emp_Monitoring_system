export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const LEAVE_TYPES = {
  SICK: 'sick',
  CASUAL: 'casual',
  VACATION: 'vacation'
};

export const ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  EMPLOYEES: '/admin/employees',
  EMPLOYEE_DETAILS: '/admin/employees/:id',
  LEAVES: '/admin/leaves',
  TASKS: '/admin/tasks',
  TIMESTAMPS: '/admin/timestamps'
};

export const STATUS_COLORS = {
  pending: 'badge-pending',
  in_progress: 'badge-info',
  completed: 'badge-success',
  approved: 'badge-success',
  rejected: 'badge-danger'
};

export const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected'
};
