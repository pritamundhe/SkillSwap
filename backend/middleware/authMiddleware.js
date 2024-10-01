import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = auth.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

export default authMiddleware;
