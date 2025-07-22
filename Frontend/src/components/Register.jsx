import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log([
          'Registration Successful',
          `Username: ${username}`,
          `User ID: ${data.userId}`
        ]);
        setMessage(' Registration successful!');
        onRegister();
      } else {
        console.error([' Registration Failed', `Error: ${data.error}`]);
        setMessage(`${data.error}`);
      }
    } catch (err) {
      console.error([' Registration Error', `Message: ${err.message}`]);
      setMessage(' Server error occurred.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p style={{ marginTop: '10px', color: 'purple' }}>{message}</p>}
    </div>
  );
}

export default Register;
