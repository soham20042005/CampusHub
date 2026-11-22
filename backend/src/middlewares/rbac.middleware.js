/**
 * Role-Based Access Control Middleware Factory
 * @param  {...string} allowedRoles Roles allowed to access the endpoint (e.g. 'ADMIN', 'FACULTY')
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error('Authentication required');
      error.statusCode = 401;
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error(
        `Forbidden: Role '${req.user.role}' is not authorized to access this resource`
      );
      error.statusCode = 403;
      return next(error);
    }

    next();
  };
};
