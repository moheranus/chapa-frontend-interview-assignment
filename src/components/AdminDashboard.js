import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const AdminDashboard = () => {
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

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <h3 className="text-xl mb-2">User List</h3>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.active ? 'Active' : 'Inactive'}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleToggleStatus(user.id, user.active)}
                  className={`p-2 rounded ${user.active ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  disabled={loading}
                >
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-xl mb-2">Payment Summary</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Transaction Count</th>
          </tr>
        </thead>
        <tbody>
          {paymentSummary.map(summary => (
            <tr key={summary.username}>
              <td className="border p-2">{summary.username}</td>
              <td className="border p-2">${summary.totalAmount}</td>
              <td className="border p-2">{summary.transactionCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;