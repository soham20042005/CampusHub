import authService from '../services/auth.service.js';
import { registerSchema, loginSchema } from '../validation/auth.schema.js';

class AuthController {
  /**
   * Register User
   */
  async register(req, res, next) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const user = await authService.register(validatedData);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: { user },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Login User
   */
  async login(req, res, next) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { user, accessToken, refreshToken } = await authService.login(
        validatedData.email,
        validatedData.password
      );

      // Set Refresh Token in HTTP-only Cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {
          user,
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Refresh Token Endpoint
   */
  async refreshToken(req, res, next) {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      const { accessToken, refreshToken: newRefreshToken } =
        await authService.refreshAccessToken(token);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: 'success',
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Logout User
   */
  async logout(req, res, next) {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      await authService.logout(token);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
      });

      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get Current Authenticated User Profile
   */
  async getMe(req, res, next) {
    try {
      res.status(200).json({
        status: 'success',
        data: { user: req.user },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
