import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

class AuthService {
  /**
   * Register new user with password hashing
   */
  async register(registerDto) {
    const existingUser = await userRepository.findByEmail(registerDto.email);
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    const user = await userRepository.createUser(
      {
        email: registerDto.email,
        passwordHash,
        role: registerDto.role,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
      },
      {
        rollNumber: registerDto.rollNumber,
        employeeId: registerDto.employeeId,
        departmentId: registerDto.departmentId,
        courseId: registerDto.courseId,
      }
    );

    return this.sanitizeUser(user);
  }

  /**
   * Authenticate user credentials and generate Access & Refresh tokens
   */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password credentials');
      error.statusCode = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error('Your account has been deactivated. Please contact campus admin.');
      error.statusCode = 403;
      throw error;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      const error = new Error('Invalid email or password credentials');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Calculate refresh token expiry (7 days from now)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await userRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return {
      user: this.sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Rotate Refresh Token and issue new Access Token
   */
  async refreshAccessToken(incomingRefreshToken) {
    if (!incomingRefreshToken) {
      const error = new Error('Refresh token is required');
      error.statusCode = 400;
      throw error;
    }

    let decoded;
    try {
      decoded = jwt.verify(
        incomingRefreshToken,
        process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_campushub_2026_enterprise'
      );
    } catch (err) {
      const error = new Error('Invalid or expired refresh token');
      error.statusCode = 401;
      throw error;
    }

    const storedToken = await userRepository.findRefreshToken(incomingRefreshToken);
    if (!storedToken || storedToken.revoked || new Date() > storedToken.expiresAt) {
      const error = new Error('Refresh token has been revoked or expired');
      error.statusCode = 401;
      throw error;
    }

    // Revoke old token (Rotation security strategy)
    await userRepository.revokeRefreshToken(incomingRefreshToken);

    const user = storedToken.user;
    if (!user.isActive) {
      const error = new Error('Account inactive');
      error.statusCode = 403;
      throw error;
    }

    const newAccessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await userRepository.createRefreshToken(user.id, newRefreshToken, expiresAt);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Revoke token on Logout
   */
  async logout(refreshToken) {
    if (refreshToken) {
      await userRepository.revokeRefreshToken(refreshToken);
    }
  }

  // Token Generators
  generateAccessToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_campushub_2026_enterprise',
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_campushub_2026_enterprise',
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' }
    );
  }

  // Strip sensitive fields
  sanitizeUser(user) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export default new AuthService();
