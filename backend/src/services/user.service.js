import userRepository from '../repositories/user.repository.js';

class UserService {
  /**
   * Get paginated user list with filters
   */
  async getUsers(queryParams) {
    return await userRepository.findPaginatedUsers(queryParams);
  }

  /**
   * Get single user profile by ID
   */
  async getUserById(userId, requestingUser) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const error = new Error(`User with ID '${userId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    // Access control: User can view their own profile, or Admin can view any profile
    if (requestingUser.role !== 'ADMIN' && requestingUser.id !== userId) {
      const error = new Error('Access denied: You can only view your own profile details');
      error.statusCode = 403;
      throw error;
    }

    return user;
  }

  /**
   * Update user details
   */
  async updateUser(userId, updateData, requestingUser) {
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      const error = new Error(`User with ID '${userId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    // Access Control Policy:
    // Non-Admin users can only edit their own basic profile (firstName, lastName, phone, avatarUrl)
    if (requestingUser.role !== 'ADMIN') {
      if (requestingUser.id !== userId) {
        const error = new Error('Access denied: You cannot update another user profile');
        error.statusCode = 403;
        throw error;
      }

      // Restrict academic modifications for non-admins
      if (updateData.studentProfile || updateData.facultyProfile) {
        const error = new Error('Access denied: Academic profile modifications require Admin privileges');
        error.statusCode = 403;
        throw error;
      }
    }

    const { studentProfile, facultyProfile, ...userData } = updateData;

    await userRepository.updateUser(userId, userData, studentProfile, facultyProfile);
    return await userRepository.findById(userId);
  }

  /**
   * Toggle account activation status
   */
  async toggleUserStatus(userId, isActive) {
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      const error = new Error(`User with ID '${userId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    // If deactivating, revoke all active sessions/refresh tokens
    if (!isActive) {
      await userRepository.revokeAllUserRefreshTokens(userId);
    }

    return await userRepository.updateUserStatus(userId, isActive);
  }
}

export default new UserService();
