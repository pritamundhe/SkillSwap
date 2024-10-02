import jwt from 'jsonwebtoken';

// Function to generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      _id: user._id,
    },
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
