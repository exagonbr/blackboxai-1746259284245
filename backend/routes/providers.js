const express = require('express');
const router = express.Router();
const { User } = require('../models/index.js');

// Get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await User.findAll({ where: { role: 'provider' } });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await User.findOne({ where: { id: req.params.id, role: 'provider' } });
    if (provider) res.json(provider);
    else res.status(404).json({ error: 'Provider not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
});

// Create new provider
router.post('/', async (req, res) => {
  try {
    const newProvider = await User.create({ ...req.body, role: 'provider' });
    res.status(201).json(newProvider);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create provider' });
  }
});

// Update provider
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id, role: 'provider' }
    });
    if (updated) {
      const updatedProvider = await User.findByPk(req.params.id);
      res.json(updatedProvider);
    } else {
      res.status(404).json({ error: 'Provider not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update provider' });
  }
});

// Delete provider
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id, role: 'provider' }
    });
    if (deleted) res.json({ message: 'Provider deleted' });
    else res.status(404).json({ error: 'Provider not found' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete provider' });
  }
});

module.exports = router;
