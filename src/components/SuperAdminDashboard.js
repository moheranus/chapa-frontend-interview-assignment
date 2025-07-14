import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import AdminDashboard from './AdminDashboard';

const SuperAdminDashboard = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getSystemStats().then(data => setStats(data));
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.addAdmin(adminUsername, adminPassword);
      setMessage(response.message);
      setAdminUsername('');
      setAdminPassword('');
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.removeAdmin(adminUsername);
      setMessage(response.message);
      setAdminUsername('');
      setAdminPassword('');
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.addUser(newUser.username, newUser.password, newUser.role);
      setMessage(response.message);
      setNewUser({ username: '', password: '', role: 'user' });
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Super Admin Dashboard</h2>
      <AdminDashboard />
      <h3 className="text-xl mb-2">System Stats</h3>
      <div className="mb-4">
        {stats ? (
          <div>
            Total Payments: ${stats.totalPayments} <br />
            Active Users: {stats.activeUsers}
          </div>
        ) : 'Loading stats...'}
      </div>
      <h3 className="text-xl mb-2">Manage Admins</h3>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Admin username"
          value={adminUsername}
          onChange={(e) => setAdminUsername(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Admin password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddAdmin}
          className="bg-blue-500 text-white p-2 rounded mr-2"
          disabled={loading}
        >
          Add Admin
        </button>
        <button
          onClick={handleRemoveAdmin}
          className="bg-red-500 text-white p-2 rounded"
          disabled={loading}
        >
          Remove Admin
        </button>
      </form>
      <h3 className="text-xl mb-2">Add New User</h3>
      <form onSubmit={handleAddUser} className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {message && <div className={message.includes('error') ? 'text-red-600' : 'text-green-600'}>{message}</div>}
    </div>
  );
};

export default SuperAdminDashboard;