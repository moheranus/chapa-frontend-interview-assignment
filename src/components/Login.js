import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import "../styles/login.css"
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      
        <div className="inner-login">
        <h2 className="login-header">Login</h2>
        <div className="mock-login-container">
          <p className="mock-login-info">Mock Credentials:</p>
          <ul className="mock-login-info-list">
            <li>User: <strong>user</strong> / Password: <strong>user123</strong></li>
            <li>Admin: <strong>admin</strong> / Password: <strong>admin123</strong></li>
            <li>Super Admin: <strong>superadmin</strong> / Password: <strong>super123</strong></li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="userinfo-input"
          />
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             className="userinfo-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <div style={{ color: '#dc2626', marginTop: '0.5rem' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;