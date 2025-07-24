const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if not exist
// jobs: id, role, company, workMode, salary, closingDate, type, postedDate
// applications: id, jobId, userId, role, company, workMode, status, appliedAt

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY,
    role TEXT,
    company TEXT,
    workMode TEXT,
    salary INTEGER,
    closingDate TEXT,
    type TEXT,
    postedDate TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobId INTEGER,
    userId TEXT,
    role TEXT,
    company TEXT,
    workMode TEXT,
    status TEXT,
    appliedAt TEXT
  )`);

  // Seed jobs from jobs.json if table is empty
  db.get('SELECT COUNT(*) as count FROM jobs', (err, row) => {
    if (err) return console.error('Error checking jobs count:', err.message);
    if (row.count === 0) {
      const jobsFile = path.join(__dirname, 'jobs.json');
      if (fs.existsSync(jobsFile)) {
        const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf-8'));
        const stmt = db.prepare('INSERT INTO jobs (id, role, company, workMode, salary, closingDate, type, postedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        jobs.forEach(job => {
          stmt.run(job.id, job.role, job.company, job.workMode, job.salary, job.closingDate, job.type, job.postedDate);
        });
        stmt.finalize();
        console.log('Seeded jobs from jobs.json');
      }
    }
  });
});

// API Endpoints

// Get all jobs
app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Apply to a job
app.post('/api/apply', (req, res) => {
  const { jobId, userId, role, company, workMode } = req.body;
  if (!jobId || !userId) return res.status(400).json({ error: 'Missing jobId or userId' });
  const status = 'Applied';
  const appliedAt = new Date().toISOString();
  db.run(
    'INSERT INTO applications (jobId, userId, role, company, workMode, status, appliedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [jobId, userId, role, company, workMode, status, appliedAt],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Get all applied jobs for a user
app.get('/api/applied', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  db.all('SELECT * FROM applications WHERE userId = ? ORDER BY appliedAt DESC', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get recent 5 applications for a user
app.get('/api/applied/recent', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  db.all('SELECT * FROM applications WHERE userId = ? ORDER BY appliedAt DESC LIMIT 5', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
}); 