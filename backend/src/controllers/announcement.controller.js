import announcementService from '../services/announcement.service.js';
import { createAnnouncementSchema } from '../validation/announcement.schema.js';

class AnnouncementController {
  async createAnnouncement(req, res, next) {
    try {
      const validated = createAnnouncementSchema.parse(req.body);
      const announcement = await announcementService.createAnnouncement(req.user, validated);

      res.status(201).json({
        status: 'success',
        message: 'Announcement published successfully',
        data: { announcement },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAnnouncements(req, res, next) {
    try {
      const announcements = await announcementService.getAnnouncements(req.user);
      res.status(200).json({ status: 'success', data: { announcements } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AnnouncementController();
