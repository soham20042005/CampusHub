import academicService from '../services/academic.service.js';
import {
  createDepartmentSchema,
  createCourseSchema,
  createAcademicYearSchema,
  createSubjectSchema,
} from '../validation/academic.schema.js';

class AcademicController {
  // Departments
  async createDepartment(req, res, next) {
    try {
      const validated = createDepartmentSchema.parse(req.body);
      const department = await academicService.createDepartment(validated);
      res.status(201).json({ status: 'success', data: { department } });
    } catch (err) {
      next(err);
    }
  }

  async getDepartments(req, res, next) {
    try {
      const departments = await academicService.getDepartments();
      res.status(200).json({ status: 'success', data: { departments } });
    } catch (err) {
      next(err);
    }
  }

  async getDepartmentById(req, res, next) {
    try {
      const department = await academicService.getDepartmentById(req.params.id);
      res.status(200).json({ status: 'success', data: { department } });
    } catch (err) {
      next(err);
    }
  }

  // Courses
  async createCourse(req, res, next) {
    try {
      const validated = createCourseSchema.parse(req.body);
      const course = await academicService.createCourse(validated);
      res.status(201).json({ status: 'success', data: { course } });
    } catch (err) {
      next(err);
    }
  }

  async getCourses(req, res, next) {
    try {
      const { departmentId } = req.query;
      const courses = await academicService.getCourses(departmentId);
      res.status(200).json({ status: 'success', data: { courses } });
    } catch (err) {
      next(err);
    }
  }

  // Academic Years
  async createAcademicYear(req, res, next) {
    try {
      const validated = createAcademicYearSchema.parse(req.body);
      const year = await academicService.createAcademicYear(validated);
      res.status(201).json({ status: 'success', data: { year } });
    } catch (err) {
      next(err);
    }
  }

  async getAcademicYears(req, res, next) {
    try {
      const years = await academicService.getAcademicYears();
      res.status(200).json({ status: 'success', data: { years } });
    } catch (err) {
      next(err);
    }
  }

  // Subjects
  async createSubject(req, res, next) {
    try {
      const validated = createSubjectSchema.parse(req.body);
      const subject = await academicService.createSubject(validated);
      res.status(201).json({ status: 'success', data: { subject } });
    } catch (err) {
      next(err);
    }
  }

  async getSubjects(req, res, next) {
    try {
      const { departmentId, courseId, semesterNumber } = req.query;
      const subjects = await academicService.getSubjects({
        departmentId,
        courseId,
        semesterNumber: semesterNumber ? parseInt(semesterNumber, 10) : undefined,
      });
      res.status(200).json({ status: 'success', data: { subjects } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AcademicController();
