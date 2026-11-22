import clubRepository from '../repositories/club.repository.js';
import { broadcastEvent } from '../config/socket.js';

class ClubService {
  async createClub(data) {
    const existing = await clubRepository.findClubByCode(data.code);
    if (existing) {
      const error = new Error(`Club with code '${data.code}' already exists`);
      error.statusCode = 409;
      throw error;
    }
    return await clubRepository.createClub(data);
  }

  async getClubs() {
    return await clubRepository.findAllClubs();
  }

  async getClubById(id) {
    const club = await clubRepository.findClubById(id);
    if (!club) {
      const error = new Error(`Club with ID '${id}' not found`);
      error.statusCode = 404;
      throw error;
    }
    return club;
  }

  async joinClub(studentUser, clubId) {
    if (!studentUser.studentProfile) {
      const error = new Error('Only registered students can join campus clubs');
      error.statusCode = 403;
      throw error;
    }
    return await clubRepository.joinClub(clubId, studentUser.studentProfile.id);
  }

  async createEvent(data) {
    const event = await clubRepository.createEvent(data);
    
    // Broadcast Real-time Socket.IO Notification to all connected clients
    broadcastEvent('new_campus_event', {
      message: `🎉 New Event Published: ${event.title}`,
      event,
    });

    return event;
  }

  async getEvents() {
    return await clubRepository.findAllEvents();
  }

  async registerForEvent(userId, eventId) {
    const event = await clubRepository.findEventById(eventId);
    if (!event) {
      const error = new Error(`Event with ID '${eventId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    if (event.maxSeats && event._count.registrations >= event.maxSeats) {
      const error = new Error('Event registration is full');
      error.statusCode = 400;
      throw error;
    }

    return await clubRepository.registerForEvent(eventId, userId);
  }
}

export default new ClubService();
