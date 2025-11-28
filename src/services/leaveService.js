import { mockLeaves } from './mockData';

const STORAGE_KEY = 'leaves_data';

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockLeaves));
  }
};

const getLeaves = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
};

const saveLeaves = (leaves) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaves));
};

export const leaveService = {
  getAll: () => {
    return getLeaves();
  },

  getByEmployeeId: (employeeId) => {
    const leaves = getLeaves();
    return leaves.filter(leave => leave.employee_id === parseInt(employeeId));
  },

  getPending: () => {
    const leaves = getLeaves();
    return leaves.filter(leave => leave.status === 'pending');
  },

  approve: (leaveId, approverId = 1) => {
    const leaves = getLeaves();
    const index = leaves.findIndex(leave => leave.id === parseInt(leaveId));
    if (index !== -1) {
      leaves[index].status = 'approved';
      leaves[index].approver_id = approverId;
      leaves[index].updated_at = new Date().toISOString();
      saveLeaves(leaves);
      return leaves[index];
    }
    return null;
  },

  reject: (leaveId, approverId = 1) => {
    const leaves = getLeaves();
    const index = leaves.findIndex(leave => leave.id === parseInt(leaveId));
    if (index !== -1) {
      leaves[index].status = 'rejected';
      leaves[index].approver_id = approverId;
      leaves[index].updated_at = new Date().toISOString();
      saveLeaves(leaves);
      return leaves[index];
    }
    return null;
  },

  filterByStatus: (status) => {
    const leaves = getLeaves();
    return leaves.filter(leave => leave.status === status);
  }
};
