import attendanceService from '../services/attendance.service.js';
import { logAttendanceSessionSchema } from '../validation/attendance.schema.js';

class AttendanceController {
  async logAttendance(req, res, next) {
    try {
      const validated = logAttendanceSessionSchema.parse(req.body);
      const session = await attendanceService.logAttendance(req.user, validated);
      res.status(201).json({
        status: 'success',
        message: 'Attendance logged successfully',
        data: { session },
      });
    } catch (err) {
      next(err);
    }
  }

  async getStudentSubjectStats(req, res, next) {
    try {
      const { studentId, subjectId } = req.params;
      const targetStudentId = studentId || req.user?.studentProfile?.id;
      const stats = await attendanceService.getStudentSubjectStats(targetStudentId, subjectId);

      res.status(200).json({ status: 'success', data: { stats } });
    } catch (err) {
      next(err);
    }
  }

  async getStudentOverall(req, res, next) {
    try {
      const studentId = req.params.studentId || req.user?.studentProfile?.id;
      const records = await attendanceService.getStudentOverallAttendance(studentId);

      res.status(200).json({ status: 'success', data: { records } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AttendanceController();
