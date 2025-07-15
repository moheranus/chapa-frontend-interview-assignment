import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import '../styles/admindashboard.css';

const AdminDashboard = ({ currentView }) => {
  const [users, setUsers] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getUsers().then(data => setUsers(data));
    api.getPaymentSummary().then(data => setPaymentSummary(data));
  }, []);

  const handleToggleStatus = async (userId, active) => {
    setLoading(true);
    await api.toggleUserStatus(userId, !active);
    setUsers(users.map(user =>
      user.id === userId ? { ...user, active: !active } : user
    ));
    setLoading(false);
  };

  if (currentView && currentView !== 'User-List' && currentView !== 'Payment-Summary') return null;

  return (
    <div className="admindashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>
      {(!currentView || currentView === 'User-List') && (
        <>
          <h3 className="section-header">User List</h3>
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.active ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.active)}
                        className={user.active ? 'deactivate-button' : 'activate-button'}
                        disabled={loading}
                      >
                        {user.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {(!currentView || currentView === 'Payment-Summary') && (
        <>
          <h3 className="section-header">Payment Summary</h3>
          <div className="table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Total Amount</th>
                  <th>Transaction Count</th>
                </tr>
              </thead>
              <tbody>
                {paymentSummary.map(summary => (
                  <tr key={summary.username}>
                    <td>{summary.username}</td>
                    <td>${summary.totalAmount}</td>
                    <td>{summary.transactionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;