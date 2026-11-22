import timetableRepository from '../repositories/timetable.repository.js';

class TimetableService {
  async createSlot(data) {
    // Check Faculty Conflict
    const facultyConflict = await timetableRepository.checkFacultyConflict(
      data.facultyId,
      data.dayOfWeek,
      data.startTime,
      data.semesterId
    );
    if (facultyConflict) {
      const error = new Error('Faculty member is already scheduled for another class at this time slot');
      error.statusCode = 409;
      throw error;
    }

    // Check Room Conflict
    const roomConflict = await timetableRepository.checkRoomConflict(
      data.roomNumber,
      data.dayOfWeek,
      data.startTime,
      data.semesterId
    );
    if (roomConflict) {
      const error = new Error(`Room '${data.roomNumber}' is already occupied at this time slot`);
      error.statusCode = 409;
      throw error;
    }

    return await timetableRepository.createSlot(data);
  }

  async getSemesterTimetable(semesterId) {
    return await timetableRepository.findSlotsBySemester(semesterId);
  }

  async getFacultyTimetable(facultyId) {
    return await timetableRepository.findSlotsByFaculty(facultyId);
  }
}

export default new TimetableService();
