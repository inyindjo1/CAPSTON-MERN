// ==== FRONTEND (client/src/App.jsx) ====

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [externalJobs, setExternalJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

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
      console.error('Failed to load jobs:', err);
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
            <h3>{job.jobTitle}</h3>
            <p><strong>Company:</strong> {job.companyName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
