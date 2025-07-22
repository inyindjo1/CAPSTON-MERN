// === src/components/Login.jsx ===
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
    <div className="app-wrapper">
      <div className="app">
        <div className="user-bar">
          <span><strong>Username:</strong> {username}</span>
          <span><strong>Password:</strong> {password}</span>
        </div>
        <div className="user-bar">
          <span><strong>Username:</strong> {username}</span>
          <span><strong>Password:</strong> {password}</span>
        </div>
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
