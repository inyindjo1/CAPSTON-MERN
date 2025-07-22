import React, { useState } from 'react';
import '../App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        onLogin(data.user);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2 className="search-title">Login</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="search-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="search-buttons">
          <button className="search-button" onClick={handleLogin}>Login</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;