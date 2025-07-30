import BlackListedToken from "../models/BlackListedToken.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
  try {
    // 🔹 Step 1: Try to get token from cookie
    let token = req.cookies.token;

    // 🔹 Step 2: If not in cookies, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    // 🔹 Step 3: If still no token, reject
    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized access, please login' });
    }

    const BlackToken = await BlackListedToken.findOne({ token });
    if (BlackToken) {
      return res.status(401).json({ msg: 'Token is blacklisted, please login again' });
    }

    // 🔹 Step 5: Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Step 6: Find user by ID
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ msg: 'User not found, unauthorized' });
    }

    // 🔹 Step 7: Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error('Error in verifyUser middleware:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
}
