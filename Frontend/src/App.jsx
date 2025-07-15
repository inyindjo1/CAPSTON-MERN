// ==== FRONTEND (client/src/App.jsx) ====

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [externalJobs, setExternalJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  async function fetchExternalJobs(term = '') {
    let url = 'https://www.arbeitnow.com/api/job-board-api';
    if (term.trim()) {
      url += `?search=${encodeURIComponent(term)}`;
    }
    try {
      const res = await fetch(url);
      const json = await res.json();
      setExternalJobs(json.data || []);
    } catch (err) {
      console.error('Error loading jobs:', err);
      setError('Failed to load jobs');
    }
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError('');
    fetchExternalJobs(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    setExternalJobs([]);
    setError('');
  };

  return (
    <div className="App">
      <h1>Find Jobs</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      {error && <p className="error">{error}</p>}

      <ul>
        {externalJobs.map((job, index) => (
          <li key={index} className="job-card">
            <h3>{job.position}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location || 'N/A'}</p>
            <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
            <p><a href={job.url} target="_blank" rel="noopener noreferrer">View Posting</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
