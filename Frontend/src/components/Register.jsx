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
    <div className="app-wrapper">
      <div className="app">
        <div className="user-bar">
          <span><strong>Username:</strong> {username}</span>
          <span><strong>Password:</strong> {password}</span>
        </div>
        <h2>Register</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
