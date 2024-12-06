const express = require('express');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

const router = express.Router();

// Route to add a new vehicle for a user
router.post('/:userId/add', async (req, res) => {
    try {
      const { chassisNo, fuelType, makerModel, kmRun, registrationDate, registrationNo } = req.body;
      const userId = req.params.userId;
  
      // Check if registrationNo is already taken
      const existingVehicle = await Vehicle.findOne({ registrationNo });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Registration number already exists' });
      }
  
      // Create a new vehicle
      const vehicle = new Vehicle({
        chassisNo,
        fuelType,
        makerModel,
        kmRun,
        registrationDate,
        user: userId,
        registrationNo,
      });
  
      await vehicle.save();
  
      // Add the vehicle to the user's vehicles array
      const user = await User.findById(userId);
      user.vehicles.push(vehicle._id);
      await user.save();
  
      res.status(201).json({ message: 'Vehicle added successfully', vehicle });
    } catch (error) {
      res.status(500).json({ message: 'Error adding vehicle', error });
    }
  });
  

// Route to get all vehicles for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.params.userId });

    if (!vehicles.length) {
      return res.status(404).json({ message: 'No vehicles found for this user' });
    }

    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
});

module.exports = router;
