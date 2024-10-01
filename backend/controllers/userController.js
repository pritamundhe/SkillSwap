import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Corrected the import to 'bcrypt'

/**
 * Register user
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hashing password during user creation
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
    }

    const isPass = await bcrypt.compare(password, existingUser.password);
    if (!isPass) {
      return res.status(403).json({ message: 'Auth failed: email or password is wrong', success: false });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        email: existingUser.email,
        _id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      success: true,
      jwtToken,
      email,
      name: existingUser.name,
    });
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId; // Get the userId from the request parameters

  try {
      const user = await User.findById(userId); // Fetch the user from the database
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Send the user data as response
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
      const { name, email, workPreference, projects, workHistory, education, role, skillsOffered, skillsWanted } = req.body;

      // Optionally validate the input data here
      const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          { name, email, workPreference, projects, workHistory, education, role, skillsOffered, skillsWanted },
          { new: true, runValidators: true } // Return the updated user and run validators
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating profile', error });
  }
};