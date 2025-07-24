import React, { useState } from 'react'; /* Import React and useState hook */

function Login({ onLogin }) {
  const [username, setUsername] = useState(''); /* State for username */
  const [password, setPassword] = useState(''); /* State for password */

  const handleLogin = async () => {
    console.log([' Attempting Login', `Username: ${username}`]); /* Log login attempt */
    try {
      const res = await fetch('http://localhost:8080/api/login', { /* Send POST request to backend */
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, /* Send JSON headers */
        body: JSON.stringify({ username, password }), /* Include credentials */
      });

      const data = await res.json(); /* Parse response */
      if (!res.ok) throw new Error(data.error || 'Login failed'); /* Handle failed login */

      console.log([' Login Success', `Message: ${data.message}`, `User ID: ${data.userId}`]); /* Log success */
      alert(data.message); /* Notify user */
      onLogin(); /* Call parent login handler */
    } catch (err) {
      console.error([' Login Error', err.message]); /* Log error */
      alert(err.message); /* Show error message */
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} /* Update username */
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} /* Update password */
      />
      <button onClick={handleLogin}>Login</button> /* Submit login */
    </div>
  );
}

export default Login; /* Export Login component */

