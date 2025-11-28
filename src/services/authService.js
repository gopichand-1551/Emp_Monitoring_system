// Static admin credentials
const ADMIN_CREDENTIALS = {
  email: 'gopi@1551',
  password: '12345'
};

const SESSION_KEY = 'admin_session';
const ADMINS_KEY = 'registered_admins';

export const authService = {
  // Get all registered admins
  getRegisteredAdmins: () => {
    const admins = localStorage.getItem(ADMINS_KEY);
    return admins ? JSON.parse(admins) : [];
  },

  // Add a new admin
  registerAdmin: (name, email, password) => {
    const admins = authService.getRegisteredAdmins();
    
    // Check if email already exists
    if (admins.some(admin => admin.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Check if it's the default admin email
    if (email === ADMIN_CREDENTIALS.email) {
      return { success: false, error: 'This email is already in use' };
    }

    const newAdmin = { name, email, password };
    admins.push(newAdmin);
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
    
    return { success: true };
  },

  signup: (name, email, password) => {
    const result = authService.registerAdmin(name, email, password);
    if (result.success) {
      // Auto-login after signup
      const session = {
        name,
        email,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    }
    return result;
  },

  login: (email, password) => {
    // Check default admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session = {
        name: 'Admin',
        email: ADMIN_CREDENTIALS.email,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    }

    // Check registered admins
    const admins = authService.getRegisteredAdmins();
    const admin = admins.find(a => a.email === email && a.password === password);
    
    if (admin) {
      const session = {
        name: admin.name,
        email: admin.email,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, session };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  logout: () => {
    sessionStorage.removeItem(SESSION_KEY);
  },

  getSession: () => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) {
      return JSON.parse(session);
    }
    return null;
  },

  isAuthenticated: () => {
    const session = authService.getSession();
    return session && session.isAuthenticated;
  }
};

