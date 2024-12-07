const express = require('express');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const akave = require("../akave");
const path = require('path'); // Import the path module
const walrus=require("../walrus")
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

    const vehicledata={
      vehicle
    }

    const jsonvehicleString = JSON.stringify(vehicledata);
    const vehicleblob = new Blob([jsonvehicleString], { type: "application/json" });
    const vehicleformData=new FormData();
    vehicleformData.append("file",vehicleblob);

    const vehicleResp=await walrus.putFile(vehicleformData);
    console.log(vehicleResp);

    vehicle.blobId=vehicleResp.newlyCreated.blobObject.blobId;
    await vehicle.save();

    // Add the vehicle to the user's vehicles array
    const user = await User.findById(userId);
    user.vehicles.push(vehicle._id);


    const userdata = {
      user
    }

    const jsonuserString = JSON.stringify(userdata);
    const userblob = new Blob([jsonuserString], { type: "application/json" });
    const formData=new FormData();
    formData.append("file",userblob);

    const userresp=await walrus.putFile(formData);

    user.blobId=userresp.newlyCreated.blobObject.blobId;
    await user.save();

    // Create a json which has all details of user and vehicle and add in akave bucket

    // const fs = require("fs");
    // const filePath = path.join(__dirname, `${registrationNo}.json`);

    // fs.writeFile(filePath, JSON.stringify(data), function(err) {
    //   if(err) {
    //       return console.log(err);
    //   }
    //   console.log("The file was saved!");
    //   akave.uploadFile("decarbonize", filePath);
    // });
      

    res.status(201).json({ message: 'Vehicle added successfully along with user and vehicle blob in walrus', vehicleResp,userresp });
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

router.put("/:vehicleId", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body, { new: true });
    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
});

module.exports = router;
