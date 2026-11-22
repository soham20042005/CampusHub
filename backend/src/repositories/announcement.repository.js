import prisma from '../config/db.js';

class AnnouncementRepository {
  async createAnnouncement(authorId, data) {
    return await prisma.announcement.create({
      data: {
        authorId,
        title: data.title,
        content: data.content,
        targetRole: data.targetRole,
        departmentId: data.departmentId,
      },
    });
  }

  async findAllAnnouncements(role, departmentId) {
    const whereClause = {
      OR: [{ targetRole: 'ALL' }, { targetRole: role }],
    };

    if (departmentId) {
      whereClause.AND = [
        { OR: [{ departmentId: null }, { departmentId }] },
      ];
    }

    return await prisma.announcement.findMany({
      where: whereClause,
      include: {
        author: { select: { firstName: true, lastName: true, role: true } },
        department: { select: { name: true, code: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default new AnnouncementRepository();
