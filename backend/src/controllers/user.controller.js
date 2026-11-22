import userService from '../services/user.service.js';
import { getUsersQuerySchema, updateUserSchema, toggleUserStatusSchema } from '../validation/user.schema.js';

class UserController {
  /**
   * List Users (Paginated & Filtered)
   */
  async getUsers(req, res, next) {
    try {
      const queryParams = getUsersQuerySchema.parse(req.query);
      const result = await userService.getUsers(queryParams);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get User by ID
   */
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id, req.user);

      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update User Profile
   */
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = updateUserSchema.parse(req.body);
      const updatedUser = await userService.updateUser(id, validatedData, req.user);

      res.status(200).json({
        status: 'success',
        message: 'User profile updated successfully',
        data: { user: updatedUser },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Toggle Active / Inactive Status (Admin Only)
   */
  async toggleStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isActive } = toggleUserStatusSchema.parse(req.body);
      const updatedUser = await userService.toggleUserStatus(id, isActive);

      res.status(200).json({
        status: 'success',
        message: `User status changed to ${isActive ? 'active' : 'inactive'}`,
        data: { user: updatedUser },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
