import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaWallet, FaList, FaUsers, FaChartBar, FaTools, FaPlus, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = ({ setCurrentView, currentView, isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useContext(AuthContext);

  const navItems = user?.role === 'superadmin'
    ? ['User-List', 'Payment-Summary', 'Manage-Admin', 'Add-User', 'System-Stats']
    : user?.role === 'admin'
    ? ['User-List', 'Payment-Summary']
    : ['Wallet', 'Transactions'];

  useEffect(() => {
    if (!currentView && navItems.length > 0) {
      setCurrentView(navItems[0]);
    }
  }, [currentView, setCurrentView, navItems]);

  const getIcon = (item) => {
    switch (item) {
      case 'Wallet': return <FaWallet />;
      case 'Transactions': return <FaList />;
      case 'User-List': return <FaUsers />;
      case 'Payment-Summary': return <FaChartBar />;
      case 'Manage-Admin': return <FaTools />;
      case 'Add-User': return <FaPlus />;
      case 'System-Stats': return <FaChartLine />;
      default: return null;
    }
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="inner">
        <header>
          <button
            type="button"
            className="burger"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>
        <nav>
          {navItems.map(item => (
            <button
              key={item}
              type="button"
              className={currentView === item ? 'active' : ''}
              onClick={() => setCurrentView(item)}
            >
              <span>{getIcon(item)}</span>
              {isSidebarOpen && <p>{item}</p>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;