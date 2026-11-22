import announcementRepository from '../repositories/announcement.repository.js';
import { broadcastEvent, emitToRole } from '../config/socket.js';

class AnnouncementService {
  async createAnnouncement(authorUser, data) {
    const announcement = await announcementRepository.createAnnouncement(authorUser.id, data);

    // Emit Socket.IO Event
    if (data.targetRole === 'ALL') {
      broadcastEvent('new_announcement', {
        title: announcement.title,
        content: announcement.content,
        createdAt: announcement.createdAt,
      });
    } else {
      emitToRole(data.targetRole, 'new_announcement', {
        title: announcement.title,
        content: announcement.content,
        createdAt: announcement.createdAt,
      });
    }

    return announcement;
  }

  async getAnnouncements(user) {
    const role = user.role;
    const departmentId =
      user.studentProfile?.departmentId || user.facultyProfile?.departmentId;

    return await announcementRepository.findAllAnnouncements(role, departmentId);
  }
}

export default new AnnouncementService();
