import academicRepository from '../repositories/academic.repository.js';

class AcademicService {
  // Department logic
  async createDepartment(data) {
    const existing = await academicRepository.findDepartmentByCode(data.code);
    if (existing) {
      const error = new Error(`Department with code '${data.code}' already exists`);
      error.statusCode = 409;
      throw error;
    }
    return await academicRepository.createDepartment(data);
  }

  async getDepartments() {
    return await academicRepository.findAllDepartments();
  }

  async getDepartmentById(id) {
    const dept = await academicRepository.findDepartmentById(id);
    if (!dept) {
      const error = new Error(`Department with ID '${id}' not found`);
      error.statusCode = 404;
      throw error;
    }
    return dept;
  }

  // Course logic
  async createCourse(data) {
    const existing = await academicRepository.findCourseByCode(data.code);
    if (existing) {
      const error = new Error(`Course with code '${data.code}' already exists`);
      error.statusCode = 409;
      throw error;
    }
    return await academicRepository.createCourse(data);
  }

  async getCourses(departmentId) {
    return await academicRepository.findAllCourses(departmentId);
  }

  // Academic Year logic
  async createAcademicYear(data) {
    return await academicRepository.createAcademicYear(data);
  }

  async getAcademicYears() {
    return await academicRepository.findAllAcademicYears();
  }

  // Subject logic
  async createSubject(data) {
    const existing = await academicRepository.findSubjectByCode(data.code);
    if (existing) {
      const error = new Error(`Subject with code '${data.code}' already exists`);
      error.statusCode = 409;
      throw error;
    }
    return await academicRepository.createSubject(data);
  }

  async getSubjects(filters) {
    return await academicRepository.findAllSubjects(filters);
  }
}

export default new AcademicService();
