import attendanceRepository from '../repositories/attendance.repository.js';

class AttendanceService {
  async logAttendance(facultyUser, payload) {
    if (!facultyUser.facultyProfile) {
      const error = new Error('Only faculty members can log lecture attendance');
      error.statusCode = 403;
      throw error;
    }

    const facultyId = facultyUser.facultyProfile.id;
    return await attendanceRepository.logSessionWithRecords(facultyId, payload);
  }

  async getStudentSubjectStats(studentId, subjectId) {
    return await attendanceRepository.getStudentSubjectStats(studentId, subjectId);
  }

  async getStudentOverallAttendance(studentId) {
    return await attendanceRepository.getStudentOverallAttendance(studentId);
  }
}

export default new AttendanceService();
