const users = [
  { id: '1', username: 'user', password: 'user123', role: 'user' },
  { id: '2', username: 'admin', password: 'admin123', role: 'admin' },
  { id: '3', username: 'superadmin', password: 'super123', role: 'superadmin' },
];

// Mock transaction data with user IDs
const transactions = [
  { id: 1, userId: 1, amount: 100, date: '2025-07-10', status: 'Completed' },
  { id: 2, userId: 1, amount: 50, date: '2025-07-09', status: 'Pending' },
  { id: 3, userId: 2, amount: 200, date: '2025-07-08', status: 'Completed' },
  {id: 4, userId: 1, amount: 1000, date: '2025-06-13', status: 'Completed'},
  {id: 5, userId: 2, amount: 1450, date: '2025-06-13', status: 'Pending'},
];

export const login = (username, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const user = users.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      resolve({ role: user.role, id: user.id });
    } else {
      reject(new Error('Invalid username or password'));
    }
  }, 1000);
});

export const addUser = (username, password, role) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (users.find(u => u.username === username)) {
      reject(new Error('Username already exists'));
    } else {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        password,
        role: role || 'user',
      };
      users.push(newUser);
      resolve({ success: true, message: `User ${username} added`, user: newUser });
    }
  }, 1000);
});

export const addAdmin = (username, password) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (users.find(u => u.username === username)) {
      reject(new Error('Username already exists'));
    } else {
      const newAdmin = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        password,
        role: 'admin',
      };
      users.push(newAdmin);
      resolve({ success: true, message: `Admin ${username} added`, user: newAdmin });
    }
  }, 1000);
});

export const removeAdmin = (username) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const index = users.findIndex(u => u.username === username && u.role === 'admin');
    if (index === -1) {
      reject(new Error('Admin not found'));
    } else {
      users.splice(index, 1);
      resolve({ success: true, message: `Admin ${username} removed` });
    }
  }, 1000);
});

export const getWalletBalance = () => new Promise((resolve) => {
  setTimeout(() => resolve({ balance: 1500.75 }), 1000);
});

export const getTransactions = () => new Promise((resolve) => {
  setTimeout(() => resolve(transactions), 1000);
});

export const initiateTransaction = (amount) => new Promise((resolve) => {
  setTimeout(() => resolve({ success: true, message: `Transaction of $${amount} initiated` }), 1000);
});

export const getUsers = () => new Promise((resolve) => {
  setTimeout(() => resolve([
    { id: 1, username: 'user1', active: true },
    { id: 2, username: 'user2', active: false },
    { id: 3, username: 'user3', active: true },
    { id: 4, username: 'user4', active: false },
    { id: 5, username: 'user5', active: true },

  ]), 1000);
});

export const getPaymentSummary = () => new Promise((resolve) => {
  setTimeout(() => {
    const summary = users
      .filter(u => u.role === 'user')
      .map(user => {
        const userTransactions = transactions.filter(t => t.userId === parseInt(user.id));
        const totalAmount = userTransactions.reduce((sum, t) => sum + t.amount, 0);
        return {
          username: user.username,
          totalAmount,
          transactionCount: userTransactions.length,
        };
      });
    resolve(summary);
  }, 1000);
});

export const toggleUserStatus = (userId, active) => new Promise((resolve) => {
  setTimeout(() => resolve({ success: true, message: `User ${userId} ${active ? 'activated' : 'deactivated'}` }), 1000);
});

export const getSystemStats = () => new Promise((resolve) => {
  setTimeout(() => resolve({ totalPayments: 10000, activeUsers: 50 }), 1000);
});