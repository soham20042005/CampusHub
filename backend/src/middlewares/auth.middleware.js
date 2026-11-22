import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Access token missing or invalid format');
      error.statusCode = 401;
      return next(error);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_campushub_2026_enterprise'
    );

    const user = await userRepository.findById(decoded.userId);
    if (!user || !user.isActive) {
      const error = new Error('User not found or account deactivated');
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      err.message = 'Access token expired';
      err.statusCode = 401;
    } else if (err.name === 'JsonWebTokenError') {
      err.message = 'Invalid access token';
      err.statusCode = 401;
    }
    next(err);
  }
};
