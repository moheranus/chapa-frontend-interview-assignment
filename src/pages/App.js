import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import SuperAdminDashboard from '../components/SuperAdminDashboard';
import Sidebar from '../components/Sidebar';
import '../styles/app.css';

const App = () => {
  const { user, logout } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user && !currentView) {
      const defaultView = user.role === 'superadmin'
        ? 'User-List'
        : user.role === 'admin'
        ? 'User-List'
        : 'Wallet';
      setCurrentView(defaultView);
    }
  }, [user, currentView]);

  if (!user) return <Login />;

  return (
    <div className="app-container">
      <Sidebar
        setCurrentView={setCurrentView}
        currentView={currentView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="header">
          <h1>Chapa Dashboard</h1>
          <button
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        {user.role === 'user' && <UserDashboard currentView={currentView} />}
        {user.role === 'admin' && <AdminDashboard currentView={currentView} />}
        {user.role === 'superadmin' && <SuperAdminDashboard currentView={currentView} />}
      </div>
    </div>
  );
};

export default App;