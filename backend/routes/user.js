const express = require('express');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

// Route to create a new user
router.post('/create', async (req, res) => {
  try {
    const { ownerName, email, vehicles } = req.body;

    const user = new User({
      ownerName,
      email,
      vehicles,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Route to get a user by ID along with their vehicles
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('vehicles');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

module.exports = router;
