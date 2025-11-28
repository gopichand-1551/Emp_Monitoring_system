import { mockTimestamps } from './mockData';

const STORAGE_KEY = 'timestamps_data';

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTimestamps));
  }
};

const getTimestamps = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
};

const saveTimestamps = (timestamps) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
};

const calculateDuration = (loginTime, logoutTime) => {
  if (!logoutTime) return null;
  const login = new Date(loginTime);
  const logout = new Date(logoutTime);
  return Math.floor((logout - login) / (1000 * 60)); // duration in minutes
};

export const timestampService = {
  getAll: () => {
    return getTimestamps();
  },

  getByEmployeeId: (employeeId) => {
    const timestamps = getTimestamps();
    return timestamps.filter(ts => ts.employee_id === parseInt(employeeId));
  },

  getByDate: (date) => {
    const timestamps = getTimestamps();
    return timestamps.filter(ts => ts.date === date);
  },

  getToday: () => {
    const today = new Date().toISOString().split('T')[0];
    return timestampService.getByDate(today);
  },

  getActiveUsers: () => {
    const timestamps = getTimestamps();
    const today = new Date().toISOString().split('T')[0];
    return timestamps.filter(ts => ts.date === today && !ts.logout_time);
  },

  formatDuration: (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  },

  getAverageWorkHours: () => {
    const timestamps = getTimestamps();
    const validTimestamps = timestamps.filter(ts => ts.work_duration);
    if (validTimestamps.length === 0) return 0;
    
    const totalMinutes = validTimestamps.reduce((sum, ts) => sum + ts.work_duration, 0);
    const avgMinutes = totalMinutes / validTimestamps.length;
    return (avgMinutes / 60).toFixed(1);
  }
};
