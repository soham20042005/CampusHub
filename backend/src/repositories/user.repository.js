import prisma from '../config/db.js';

class UserRepository {
  /**
   * Find user by unique email address with profile inclusions
   */
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        facultyProfile: true,
      },
    });
  }

  /**
   * Find user by Primary Key UUID
   */
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        studentProfile: {
          include: {
            department: true,
            course: true,
          },
        },
        facultyProfile: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  /**
   * Find paginated users with search & filters
   */
  async findPaginatedUsers({ page = 1, limit = 10, role, departmentId, search, isActive }) {
    const skip = (page - 1) * limit;

    const whereClause = {};

    if (role) {
      whereClause.role = role;
    }

    if (typeof isActive === 'boolean') {
      whereClause.isActive = isActive;
    }

    if (departmentId) {
      whereClause.OR = [
        { studentProfile: { departmentId } },
        { facultyProfile: { departmentId } },
      ];
    }

    if (search) {
      const searchTerms = {
        contains: search,
        mode: 'insensitive',
      };

      whereClause.OR = [
        { firstName: searchTerms },
        { lastName: searchTerms },
        { email: searchTerms },
        { studentProfile: { rollNumber: searchTerms } },
        { facultyProfile: { employeeId: searchTerms } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where: whereClause }),
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          studentProfile: {
            select: {
              rollNumber: true,
              department: { select: { name: true, code: true } },
              course: { select: { name: true, code: true } },
              currentSemester: true,
              cgpa: true,
            },
          },
          facultyProfile: {
            select: {
              employeeId: true,
              designation: true,
              department: { select: { name: true, code: true } },
            },
          },
        },
      }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create a new user record with transactional profile insertion
   */
  async createUser(userData, profileData = {}) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: userData.email,
          passwordHash: userData.passwordHash,
          role: userData.role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        },
      });

      if (userData.role === 'STUDENT' && profileData.rollNumber) {
        const studentPayload = {
          userId: user.id,
          rollNumber: profileData.rollNumber,
          batchYear: profileData.batchYear || new Date().getFullYear(),
        };
        if (profileData.departmentId) {
          studentPayload.departmentId = profileData.departmentId;
        }
        if (profileData.courseId) {
          studentPayload.courseId = profileData.courseId;
        }
        await tx.studentProfile.create({
          data: studentPayload,
        });
      } else if (userData.role === 'FACULTY' && profileData.employeeId) {
        const facultyPayload = {
          userId: user.id,
          employeeId: profileData.employeeId,
          designation: profileData.designation || 'Lecturer',
        };
        if (profileData.departmentId) {
          facultyPayload.departmentId = profileData.departmentId;
        }
        await tx.facultyProfile.create({
          data: facultyPayload,
        });
      }

      return user;
    });
  }

  /**
   * Update user and associated profile
   */
  async updateUser(id, userData, studentProfileData, facultyProfileData) {
    return await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: userData,
      });

      if (studentProfileData && Object.keys(studentProfileData).length > 0) {
        await tx.studentProfile.update({
          where: { userId: id },
          data: studentProfileData,
        });
      }

      if (facultyProfileData && Object.keys(facultyProfileData).length > 0) {
        await tx.facultyProfile.update({
          where: { userId: id },
          data: facultyProfileData,
        });
      }

      return updatedUser;
    });
  }

  /**
   * Update User Account Active Status
   */
  async updateUserStatus(id, isActive) {
    return await prisma.user.update({
      where: { id },
      data: { isActive },
    });
  }

  /**
   * Refresh Token Persistence Methods
   */
  async createRefreshToken(userId, token, expiresAt) {
    return await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token) {
    return await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async revokeRefreshToken(token) {
    return await prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }

  async revokeAllUserRefreshTokens(userId) {
    return await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });
  }
}

export default new UserRepository();
