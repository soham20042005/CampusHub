import prisma from '../config/db.js';

class AttendanceRepository {
  /**
   * Transactional attendance logging for session and records
   */
  async logSessionWithRecords(facultyId, { allocationId, slotId, sessionDate, records }) {
    return await prisma.$transaction(async (tx) => {
      const session = await tx.attendanceSession.create({
        data: {
          allocationId,
          facultyId,
          slotId,
          sessionDate: new Date(sessionDate),
        },
      });

      const recordsData = records.map((rec) => ({
        sessionId: session.id,
        studentId: rec.studentId,
        status: rec.status,
      }));

      await tx.attendanceRecord.createMany({
        data: recordsData,
      });

      return session;
    });
  }

  /**
   * Subject-wise attendance calculation for a student
   */
  async getStudentSubjectStats(studentId, subjectId) {
    const totalSessions = await prisma.attendanceRecord.count({
      where: {
        studentId,
        session: { allocation: { subjectId } },
      },
    });

    const presentSessions = await prisma.attendanceRecord.count({
      where: {
        studentId,
        session: { allocation: { subjectId } },
        status: 'PRESENT',
      },
    });

    const percentage = totalSessions > 0 ? ((presentSessions / totalSessions) * 100).toFixed(2) : 0;

    return {
      totalSessions,
      presentSessions,
      absentSessions: totalSessions - presentSessions,
      percentage: parseFloat(percentage),
      isLowAttendance: percentage < 75.0,
    };
  }

  /**
   * Get all attendance records for a student across all subjects
   */
  async getStudentOverallAttendance(studentId) {
    const records = await prisma.attendanceRecord.findMany({
      where: { studentId },
      include: {
        session: {
          include: {
            allocation: {
              include: { subject: { select: { code: true, name: true } } },
            },
          },
        },
      },
      orderBy: { session: { sessionDate: 'desc' } },
    });

    return records;
  }
}

export default new AttendanceRepository();
