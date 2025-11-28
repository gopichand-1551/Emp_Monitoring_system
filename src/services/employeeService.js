import { mockEmployees } from './mockData';

const STORAGE_KEY = 'employees_data';

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees));
  }
};

const getEmployees = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data) || [];
};

const saveEmployees = (employees) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

export const employeeService = {
  getAll: () => {
    return getEmployees();
  },

  getById: (id) => {
    const employees = getEmployees();
    return employees.find(emp => emp.id === parseInt(id));
  },

  create: (employeeData) => {
    const employees = getEmployees();
    const newEmployee = {
      ...employeeData,
      id: Math.max(...employees.map(e => e.id), 0) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    employees.push(newEmployee);
    saveEmployees(employees);
    return newEmployee;
  },

  update: (id, employeeData) => {
    const employees = getEmployees();
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
      employees[index] = {
        ...employees[index],
        ...employeeData,
        id: parseInt(id),
        updated_at: new Date().toISOString()
      };
      saveEmployees(employees);
      return employees[index];
    }
    return null;
  },

  delete: (id) => {
    const employees = getEmployees();
    const filtered = employees.filter(emp => emp.id !== parseInt(id));
    saveEmployees(filtered);
    return { success: true };
  },

  search: (query) => {
    const employees = getEmployees();
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery) ||
      emp.designation.toLowerCase().includes(lowerQuery) ||
      emp.team.toLowerCase().includes(lowerQuery)
    );
  }
};
