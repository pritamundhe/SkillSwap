import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Corrected the import to 'bcrypt'

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, file } = req.body; // Destructure image directly

    const userId = req.params.userId; // Ensure correct extraction of userId
    const image = req.file.path;
    // Optionally validate the input data here
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const user = await User.findById(userId); // Use findById for clarity

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        image, // This should handle image URL or path if uploaded
      },
      { new: true, runValidators: true } // Return the updated user and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return the updated user information

  } catch (error) {
    console.error('Error updating profile:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating profile', error });
  }
};


export const getUserProfile = async (req, res) => {
  const userId = req.params.userId; // Get the userId from the request parameters

  try {
    // Fetch the user including the image and populate skills
    const user = await User.findById(userId)
      .populate('skillsOffered') // Populate skillsOffered to get skill details
      .select('name email role views image skillsOffered reviews createdAt updatedAt'); // Select fields you want to return

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the image data needs conversion, you can do it here.
    // Example: Check if image field exists and format it
    if (user.image && user.image.data) {
      user.image = `data:${user.image.contentType};base64,${user.image.data.toString('base64')}`;
    }

    // Return the user's full profile including the image and populated skills
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



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
        name: existingUser.name,
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
      email: existingUser.email,
      name: existingUser.name,
      Id:existingUser._id
    });
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
}
