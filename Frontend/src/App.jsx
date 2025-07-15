import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h2>Welcome to the Job Finder App</h2>
      <p>Search jobs, view saved, or manage your posts.</p>
    </div>
  );
}

function SearchJobs() {
  const [externalJobs, setExternalJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  async function fetchExternalJobs(term = '') {
    let url = 'http://localhost:8080/api/external-jobs';
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
      <ul className="job-list">
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

function SavedJobs() {
  return <div className="page"><h2>Saved Jobs</h2><p>Coming soon...</p></div>;
}

function ManageJobs() {
  return <div className="page"><h2>Manage My Jobs</h2><p>Coming soon...</p></div>;
}

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/manage">Manage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchJobs />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/manage" element={<ManageJobs />} />
      </Routes>
    </Router>
  );
}

export default App;