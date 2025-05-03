const express = require('express');
const router = express.Router();
const { Ride } = require('../models/index.js');

// Get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.findAll();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rides' });
  }
});

// Get ride by ID
router.get('/:id', async (req, res) => {
  try {
    const ride = await Ride.findByPk(req.params.id);
    if (ride) res.json(ride);
    else res.status(404).json({ error: 'Ride not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ride' });
  }
});

// Create new ride
router.post('/', async (req, res) => {
  try {
    const newRide = await Ride.create(req.body);
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create ride' });
  }
});

// Update ride
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Ride.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRide = await Ride.findByPk(req.params.id);
      res.json(updatedRide);
    } else {
      res.status(404).json({ error: 'Ride not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update ride' });
  }
});

// Delete ride
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Ride.destroy({
      where: { id: req.params.id }
    });
    if (deleted) res.json({ message: 'Ride deleted' });
    else res.status(404).json({ error: 'Ride not found' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete ride' });
  }
});

module.exports = router;
