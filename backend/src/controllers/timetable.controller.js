import timetableService from '../services/timetable.service.js';
import { createTimetableSlotSchema } from '../validation/timetable.schema.js';

class TimetableController {
  async createSlot(req, res, next) {
    try {
      const validated = createTimetableSlotSchema.parse(req.body);
      const slot = await timetableService.createSlot(validated);
      res.status(201).json({ status: 'success', data: { slot } });
    } catch (err) {
      next(err);
    }
  }

  async getSemesterTimetable(req, res, next) {
    try {
      const { semesterId } = req.params;
      const slots = await timetableService.getSemesterTimetable(semesterId);
      res.status(200).json({ status: 'success', data: { slots } });
    } catch (err) {
      next(err);
    }
  }

  async getFacultyTimetable(req, res, next) {
    try {
      const facultyId = req.params.facultyId || req.user?.facultyProfile?.id;
      const slots = await timetableService.getFacultyTimetable(facultyId);
      res.status(200).json({ status: 'success', data: { slots } });
    } catch (err) {
      next(err);
    }
  }
}

export default new TimetableController();
