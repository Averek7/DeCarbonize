const express = require('express');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const walrus=require("../walrus")
const router = express.Router();

// Route to create a new user
router.post('/create', async (req, res) => {
  try {
    const { ownerName, email } = req.body;
    console.log(req.body);  
    const jsonuserString = JSON.stringify(req.body);
    const userblob = new Blob([jsonuserString], { type: "application/json" });
    const formData=new FormData();
    formData.append("file",userblob);

    const userresp=await walrus.putFile(formData);

    console.log(userresp.newlyCreated.blobObject.blobId);
    const user = new User({
      ownerName,
      email,
      blobId:userresp.newlyCreated.blobObject.blobId
    });
    console.log(user);

    await user.save();
    res.status(201).json({ message: 'User created successfully', user,userresp });
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
