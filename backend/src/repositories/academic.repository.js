import prisma from '../config/db.js';

class AcademicRepository {
  // ==========================================
  // DEPARTMENT METHODS
  // ==========================================
  async createDepartment(data) {
    return await prisma.department.create({ data });
  }

  async findAllDepartments() {
    return await prisma.department.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { courses: true, students: true, faculties: true, subjects: true },
        },
      },
    });
  }

  async findDepartmentById(id) {
    return await prisma.department.findUnique({
      where: { id },
      include: {
        courses: true,
        subjects: true,
      },
    });
  }

  async findDepartmentByCode(code) {
    return await prisma.department.findUnique({ where: { code } });
  }

  // ==========================================
  // COURSE METHODS
  // ==========================================
  async createCourse(data) {
    return await prisma.course.create({ data });
  }

  async findAllCourses(departmentId) {
    const where = departmentId ? { departmentId } : {};
    return await prisma.course.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        department: { select: { name: true, code: true } },
        _count: { select: { students: true, subjects: true } },
      },
    });
  }

  async findCourseByCode(code) {
    return await prisma.course.findUnique({ where: { code } });
  }

  // ==========================================
  // ACADEMIC YEAR & SEMESTER METHODS
  // ==========================================
  async createAcademicYear(data) {
    return await prisma.academicYear.create({ data });
  }

  async findAllAcademicYears() {
    return await prisma.academicYear.findMany({
      orderBy: { yearLabel: 'desc' },
      include: { semesters: true },
    });
  }

  // ==========================================
  // SUBJECT METHODS
  // ==========================================
  async createSubject(data) {
    return await prisma.subject.create({ data });
  }

  async findAllSubjects({ departmentId, courseId, semesterNumber }) {
    const whereClause = {};
    if (departmentId) whereClause.departmentId = departmentId;
    if (courseId) whereClause.courseId = courseId;
    if (semesterNumber) whereClause.semesterNumber = semesterNumber;

    return await prisma.subject.findMany({
      where: whereClause,
      orderBy: [{ semesterNumber: 'asc' }, { code: 'asc' }],
      include: {
        department: { select: { name: true, code: true } },
        course: { select: { name: true, code: true } },
      },
    });
  }

  async findSubjectByCode(code) {
    return await prisma.subject.findUnique({ where: { code } });
  }
}

export default new AcademicRepository();
