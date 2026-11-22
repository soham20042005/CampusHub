import clubService from '../services/club.service.js';
import { createClubSchema, createEventSchema, joinClubSchema } from '../validation/club.schema.js';

class ClubController {
  // Clubs
  async createClub(req, res, next) {
    try {
      const validated = createClubSchema.parse(req.body);
      const club = await clubService.createClub(validated);
      res.status(201).json({ status: 'success', data: { club } });
    } catch (err) {
      next(err);
    }
  }

  async getClubs(req, res, next) {
    try {
      const clubs = await clubService.getClubs();
      res.status(200).json({ status: 'success', data: { clubs } });
    } catch (err) {
      next(err);
    }
  }

  async getClubById(req, res, next) {
    try {
      const club = await clubService.getClubById(req.params.id);
      res.status(200).json({ status: 'success', data: { club } });
    } catch (err) {
      next(err);
    }
  }

  async joinClub(req, res, next) {
    try {
      const { clubId } = joinClubSchema.parse(req.body);
      const membership = await clubService.joinClub(req.user, clubId);
      res.status(201).json({ status: 'success', message: 'Joined club successfully', data: { membership } });
    } catch (err) {
      next(err);
    }
  }

  // Events
  async createEvent(req, res, next) {
    try {
      const validated = createEventSchema.parse(req.body);
      const event = await clubService.createEvent(validated);
      res.status(201).json({ status: 'success', data: { event } });
    } catch (err) {
      next(err);
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await clubService.getEvents();
      res.status(200).json({ status: 'success', data: { events } });
    } catch (err) {
      next(err);
    }
  }

  async registerForEvent(req, res, next) {
    try {
      const { id: eventId } = req.params;
      const registration = await clubService.registerForEvent(req.user.id, eventId);
      res.status(201).json({ status: 'success', message: 'Registered for event successfully', data: { registration } });
    } catch (err) {
      next(err);
    }
  }
}

export default new ClubController();
