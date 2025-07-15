import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', title: '' });
  const [error, setError] = useState('');
  const [externalJobs, setExternalJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchExternalJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch('http://localhost:8080/api/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs');
    }
  }

  async function fetchExternalJobs(term = '') {
    const url = `https://linkedin-job-search-api.p.rapidapi.com/active-jb-1h?offset=0&query=${encodeURIComponent(term)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c21b8e863fmsh6a988e4c47b5b44p174683jsnad7a1dd6ec2f',
        'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
      }
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setExternalJobs(data.jobs || []);
    } catch (err) {
      console.error('Failed to load external jobs:', err);
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.company.trim() || !form.title.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const newJob = await res.json();
      setJobs(prev => [...prev, newJob]);
      setForm({ company: '', title: '' });
    } catch (err) {
      setError('Failed to add job.');
    }
  };

  const handleReset = async () => {
    try {
      await fetch('http://localhost:8080/api/jobs', {
        method: 'DELETE'
      });
      setJobs([]);
    } catch (err) {
      setError('Failed to reset jobs');
    }
  };

  const handleExternalSearch = () => {
    fetchExternalJobs(searchTerm);
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

      {error && <p className="error">{error}</p>}

      <ul>
        {jobs.map(job => (
          <li key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
          </li>
        ))}
      </ul>

      <h2>External Jobs</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search external jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExternalSearch}>Search</button>
      </div>

      <ul>
        {externalJobs.map((job, index) => (
          <li key={index} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p><strong>Company:</strong> {job.companyName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;