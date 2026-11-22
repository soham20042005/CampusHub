import prisma from '../config/db.js';

class ClubRepository {
  async createClub(data) {
    return await prisma.club.create({ data });
  }

  async findAllClubs() {
    return await prisma.club.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { memberships: true, events: true } },
      },
    });
  }

  async findClubById(id) {
    return await prisma.club.findUnique({
      where: { id },
      include: {
        advisorFaculty: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
        events: true,
        memberships: {
          include: {
            student: {
              include: { user: { select: { firstName: true, lastName: true } } },
            },
          },
        },
      },
    });
  }

  async findClubByCode(code) {
    return await prisma.club.findUnique({ where: { code } });
  }

  async joinClub(clubId, studentId) {
    return await prisma.clubMembership.create({
      data: { clubId, studentId, role: 'MEMBER' },
    });
  }

  // Events
  async createEvent(data) {
    return await prisma.event.create({
      data: {
        clubId: data.clubId,
        title: data.title,
        description: data.description,
        venue: data.venue,
        eventDate: new Date(data.eventDate),
        maxSeats: data.maxSeats,
        bannerUrl: data.bannerUrl,
      },
    });
  }

  async findAllEvents() {
    return await prisma.event.findMany({
      orderBy: { eventDate: 'asc' },
      include: {
        club: { select: { name: true, code: true } },
        _count: { select: { registrations: true } },
      },
    });
  }

  async findEventById(id) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { registrations: true } },
      },
    });
  }

  async registerForEvent(eventId, userId) {
    return await prisma.eventRegistration.create({
      data: { eventId, userId },
    });
  }
}

export default new ClubRepository();
