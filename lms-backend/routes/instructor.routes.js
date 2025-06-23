import express from "express";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  createAssignment,
  getSubmissionsByLesson,
  getSubmissionsByAssignment,
  evaluateSubmission,
} from "../controllers/instructor/instructor.controller.js";
import { isAuthenticated, isInstructor } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(isAuthenticated, isInstructor);

router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

router.post("/courses/:courseId/lessons", upload.single("video"), addLesson);
router.post("/lessons/:lessonId/assignments", createAssignment);

router.get("/lessons/:lessonId/submissions", getSubmissionsByLesson);
router.get("/assignments/:assignmentId/submissions", getSubmissionsByAssignment);
router.put("/submissions/:id/evaluate", evaluateSubmission);

export default router;
