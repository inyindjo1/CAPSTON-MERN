import React, { useState } from 'react';
import '../App.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        onRegister(data.user);
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2 className="search-title">Register</h2>
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
          <button className="search-button" onClick={handleRegister}>Register</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
