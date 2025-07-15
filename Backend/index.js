import express from 'express'
const app = express();
const port = 8080;


app.use(express.json());

let jobs = [
  { id: 1, company: 'Google', title: 'Frontend Developer' },
  { id: 2, company: 'Amazon', title: 'Backend Developer' }
];

app.get('/', (req, res) => {
  res.json('Job Finder (from server)');
});

app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = { id: Date.now(), ...req.body };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.listen(port, () => console.log('listening on: ' + port));
