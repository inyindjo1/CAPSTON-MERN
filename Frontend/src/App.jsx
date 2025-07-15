// ==== FRONTEND (client/src/App.jsx) ====

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', title: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const res = await fetch('http://localhost:8080/api/jobs');
    const data = await res.json();
    setJobs(data);
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newJob = await res.json();
    setJobs(prev => [...prev, newJob]);
    setForm({ company: '', title: '' });
  };

  const handleReset = async () => {
    await fetch('http://localhost:8080/', {
      method: 'DELETE'
    });
    setJobs([]);
  };

  return (
    <div className="App">
      <h1>Job Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <button type="submit">Add Job</button>
      </form>

      <button className="reset-button" onClick={handleReset}>Reset Jobs</button>

      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
