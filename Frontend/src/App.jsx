import React, { useEffect, useState } from 'react'; /* React core and hooks */
import Login from './components/Login'; /* Login component */
import Register from './components/Register'; /* Register component */

import './App.css'; /* Import CSS */
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; /* React Router imports */


function Home() {
  console.log('Rendering Home page');
  return (
    <div className="page">
      <h2>Welcome to the Job Finder App</h2>
      <p>Search jobs, view saved, or manage your posts.</p>
    </div>
  );
}

function SearchJobs() {
  const [externalJobs, setExternalJobs] = useState([]); /* State for external jobs */
  const [searchTerm, setSearchTerm] = useState(''); /* State for search term */
  const [error, setError] = useState(''); /* State for error messages */

  async function fetchExternalJobs(term = '') {
    let url = 'https://www.arbeitnow.com/api/job-board-api'; /* API endpoint */
    if (term.trim()) {
      url += `?search=${encodeURIComponent(term)}`; /* Add query parameter if term is provided */
    }
    console.log(' Fetching jobs from:', url);

    try {
      const res = await fetch(url); /* Fetch data from API */
      const json = await res.json(); /* Parse JSON */
      console.log(' Fetched jobs:', json.data);
      setExternalJobs(json.data || []); /* Set jobs if data exists */
    } catch (err) {
      console.error(' Error fetching jobs:', err);
      setError('Failed to load jobs'); /* Set error if fetch fails */
    }
  }

  const handleSearch = () => {
    console.log(' Searching for:', searchTerm);
    if (!searchTerm.trim()) {
      setError('Please enter a search term.'); /* Error if input is empty */
      return;
    }
    setError('');
    fetchExternalJobs(searchTerm); /* Call API with search term */
  };

  const handleReset = () => {
    console.log(' Resetting search');
    setSearchTerm(''); /* Clear search input */
    setExternalJobs([]); /* Clear results */
    setError(''); /* Clear error */
  };

  return (
    <div className="App-wrapper">
      <div className="App">
        <h1>Find Jobs</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} /* Update input */
          />
          <button onClick={handleSearch}>Search</button>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
        {error && <p className="error">{error}</p>} 
        <ul className="job-list">
          {externalJobs.map((job, index) => (
            <li key={index} className="job-card box">
              <h3>{job.position}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location || 'N/A'}</p>
              <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
              <p><a href={job.url} target="_blank" rel="noopener noreferrer">View Posting</a></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SavedJobs() {
  console.log('Rendering Saved Jobs');
  return <div className="page"><h2>Saved Jobs</h2><p>Coming soon...</p></div>; /* Placeholder for saved jobs */
}

function ManageJobs() {
  console.log(' Rendering Manage Jobs');
  return <div className="page"><h2>Manage My Jobs</h2><p>Coming soon...</p></div>; /* Placeholder for managing jobs */
}

function App() {
  console.log('App loaded');
  const navigate = useNavigate(); /* Navigation hook */

  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/manage">Manage</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchJobs />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/manage" element={<ManageJobs />} />
        <Route path="/login" element={<Login onLogin={() => {
          navigate('/'); /* Redirect to home after login */
        }} />} />
        <Route path="/register" element={<Register onRegister={() => {
          navigate('/'); /* Redirect to home after register */
        }} />} />
      </Routes>
    </>
  );
}

export default App; /* Export the App component */
