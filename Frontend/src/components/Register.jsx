import React, { useState } from 'react'; /* Import React and useState hook */

function Register({ onRegister }) {
  const [username, setUsername] = useState(''); /* State for username */
  const [password, setPassword] = useState(''); /* State for password */
  const [message, setMessage] = useState(''); /* State for status message */

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/register', { /* Make POST request to backend */
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, /* Send JSON headers */
        body: JSON.stringify({ username, password }), /* Send request body */
      });

      const data = await response.json(); /* Parse response */
      if (response.ok) {
        console.log([
          'Registration Successful',
          `Username: ${username}`,
          `User ID: ${data.userId}`
        ]);
        setMessage(' Registration successful!'); /* Show success message */
        onRegister(); /* Call callback to redirect */
      } else {
        console.error([' Registration Failed', `Error: ${data.error}`]);
        setMessage(`${data.error}`); /* Show error message */
      }
    } catch (err) {
      console.error([' Registration Error', `Message: ${err.message}`]);
      setMessage(' Server error occurred.'); /* Catch block for fetch errors */
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} /* Update username state */
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} /* Update password state */
      />
      <button onClick={handleRegister}>Register</button> {/* Submit registration */}
      {message && <p style={{ marginTop: '10px', color: 'purple' }}>{message}</p>} {/* Show message */}
    </div>
  );
}

export default Register; /* Export the Register component */
