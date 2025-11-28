import { mockTasks } from './mockData';

const STORAGE_KEY = 'tasks_data';

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks));
  }
};

const getTasks = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const taskService = {
  getAll: () => {
    return getTasks();
  },

  getByEmployeeId: (employeeId) => {
    const tasks = getTasks();
    return tasks.filter(task => task.employee_id === parseInt(employeeId));
  },

  getByDate: (date) => {
    const tasks = getTasks();
    return tasks.filter(task => task.assigned_date === date);
  },

  getByStatus: (status) => {
    const tasks = getTasks();
    return tasks.filter(task => task.status === status);
  },

  getToday: () => {
    const today = new Date().toISOString().split('T')[0];
    return taskService.getByDate(today);
  },

  getStatusCounts: () => {
    const tasks = getTasks();
    return {
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      total: tasks.length
    };
  },

  updateStatus: (taskId, status) => {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id === parseInt(taskId));
    if (index !== -1) {
      tasks[index].status = status;
      tasks[index].updated_at = new Date().toISOString();
      saveTasks(tasks);
      return tasks[index];
    }
    return null;
  }
};
