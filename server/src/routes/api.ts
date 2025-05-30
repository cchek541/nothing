import express from 'express';

const router = express.Router();

// Example API endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API route!' });
});

// Example data endpoint
router.get('/data', (req, res) => {
  const sampleData = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
  ];
  
  res.json(sampleData);
});

// Example POST endpoint
router.post('/data', (req, res) => {
  const { name, description } = req.body;
  
  // In a real app, you would save this to a database
  // For now, just echo it back with a new ID
  res.status(201).json({
    id: Math.floor(Math.random() * 1000),
    name,
    description,
    createdAt: new Date()
  });
});

export default router; 