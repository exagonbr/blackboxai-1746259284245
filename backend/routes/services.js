const express = require('express');
const router = express.Router();

// Mock services data
const services = [
  { id: 1, name: 'Engine Repair', priceRange: '$100 - $200' },
  { id: 2, name: 'Oil Change', priceRange: '$30 - $50' },
  { id: 3, name: 'Brake Service', priceRange: '$80 - $150' },
  { id: 4, name: 'Tire Replacement', priceRange: '$100 - $250' },
];

// Get all services
router.get('/', (req, res) => {
  res.json(services);
});

// Get service by ID
router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

module.exports = router;
