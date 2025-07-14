import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import SuperAdminDashboard from '../components/SuperAdminDashboard';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between p-4 bg-blue-600 text-white">
        <h1>Chapa Dashboard</h1>
        <button onClick={logout} className="bg-red-500 p-2 rounded">
          Logout
        </button>
      </div>
      {user.role === 'user' && <UserDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'superadmin' && <SuperAdminDashboard />}
    </div>
  );
};

export default App;