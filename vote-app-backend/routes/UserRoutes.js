const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');



// router.get('/user-signups', async (req, res) => {
//   try {
//     const result = await User.aggregate([
//       {
//         $project: {
//           day: { $dateToString: { format: "%Y-%m-%d", date: "$loginDate" } }
//         }
//       },
//       {
//         $group: {
//           _id: "$day",
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } } // Sort by date ascending
//     ]);
//     res.json(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

router.get('/user-signups', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $addFields: { loginDate: { $toDate: "$loginDate" } } // Convert if stored as string
      },
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$loginDate" } }
        }
      },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error", details: err });
  }
});
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Authenticated route to get user data
router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password field
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  router.put('/:id', async (req, res) => {
    try {
      const { email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { email }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  });




// Signup Route
router.post('/signup', async (req, res) => {

    console.log(req.body)
    try {
      const { username, email, password, phone, aadhar, dob } = req.body;
  
      // Validate fields
      if (!username || !email || !password || !phone || !aadhar || !dob) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create new user
      const newUser = new User({ username, email, password, phone, aadhar, dob });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
      console.error('Error while saving user:', err);

    }
  });
  

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
