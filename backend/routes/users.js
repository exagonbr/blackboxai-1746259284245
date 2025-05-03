const express = require('express');
const router = express.Router();
const { User } = require('../models/index.js');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) res.json({ message: 'User deleted' });
    else res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
