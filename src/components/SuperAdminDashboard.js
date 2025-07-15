import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import AdminDashboard from './AdminDashboard';
import '../styles/superAdmin.css';

const SuperAdminDashboard = ({ currentView }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentView || currentView === 'System-Stats') {
      api.getSystemStats().then(data => setStats(data));
    }
  }, [currentView]);

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

  if (currentView && currentView !== 'User-List' && currentView !== 'Payment-Summary' && currentView !== 'Manage-Admin' && currentView !== 'Add-User' && currentView !== 'System-Stats') return null;

  return (
    <div className="superadmin-container">
      {/* <h2 className="superadmin-header">Super Admin Dashboard</h2> */}
      {(!currentView || currentView === 'User-List' || currentView === 'Payment-Summary') && (
        <AdminDashboard currentView={currentView} />
      )}
      {(!currentView || currentView === 'System-Stats') && (
        <>
          <h3 className="section-header">System Stats</h3>
          <div className="stats-container">
            {stats ? (
              <div className="stats-content">
                Total Payments: ${stats.totalPayments} <br />
                Active Users: {stats.activeUsers}
              </div>
            ) : 'Loading stats...'}
          </div>
        </>
      )}
      {(!currentView || currentView === 'Manage-Admin') && (
        <>
          <h3 className="section-header">Manage Admins</h3>
          <form className="admin-form">
            <input
              type="text"
              placeholder="Admin username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="form-input"
            />
            <input
              type="password"
              placeholder="Admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="form-input"
            />
            <button
              onClick={handleAddAdmin}
              className="add-admin-button"
              disabled={loading}
            >
              Add Admin
            </button>
            <button
              onClick={handleRemoveAdmin}
              className="remove-admin-button"
              disabled={loading}
            >
              Remove Admin
            </button>
          </form>
        </>
      )}
      {(!currentView || currentView === 'Add-User') && (
        <>
          <h3 className="section-header">Add New User</h3>
          <form className="user-form" onSubmit={handleAddUser}>
            <div className='form-wrapper'>
                  <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="form-input super-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="form-input super-input"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-select super-inputs"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            <button
              type="submit"
              className="add-user-button"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
            </div>
            
          </form>
        </>
      )}
      {message && <div className={message.includes('error') ? 'error-message' : 'success-message'}>{message}</div>}
    </div>
  );
};

export default SuperAdminDashboard;