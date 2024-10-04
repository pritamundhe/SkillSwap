// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user object to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
