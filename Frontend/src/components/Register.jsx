import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Registered successfully!');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
