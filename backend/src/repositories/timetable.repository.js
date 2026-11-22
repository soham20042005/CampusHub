import prisma from '../config/db.js';

class TimetableRepository {
  async createSlot(data) {
    return await prisma.timetableSlot.create({ data });
  }

  async checkFacultyConflict(facultyId, dayOfWeek, startTime, semesterId) {
    return await prisma.timetableSlot.findFirst({
      where: { facultyId, dayOfWeek, startTime, semesterId },
    });
  }

  async checkRoomConflict(roomNumber, dayOfWeek, startTime, semesterId) {
    return await prisma.timetableSlot.findFirst({
      where: { roomNumber, dayOfWeek, startTime, semesterId },
    });
  }

  async findSlotsBySemester(semesterId) {
    return await prisma.timetableSlot.findMany({
      where: { semesterId },
      include: {
        subject: { select: { code: true, name: true } },
        faculty: {
          select: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findSlotsByFaculty(facultyId) {
    return await prisma.timetableSlot.findMany({
      where: { facultyId },
      include: {
        subject: { select: { code: true, name: true } },
        semester: { select: { semesterNumber: true } },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }
}

export default new TimetableRepository();
