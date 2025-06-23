import express from "express";
import {
  enrollInCourse,
  getMyCourses,
  markLessonComplete,
  submitAssignment,
  getMySubmissions,
  generateQuiz,
} from "../controllers/student/student.controller.js";
import { isAuthenticated, isStudent } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isAuthenticated, isStudent);

router.post("/enroll/:courseId", enrollInCourse);
router.get("/my-courses", getMyCourses);
router.put("/lessons/:lessonId/complete", markLessonComplete);

router.post("/assignments/:assignmentId/submit", submitAssignment);
router.get("/submissions", getMySubmissions);

// AI-powered quiz generation
router.post("/lessons/:lessonId/quiz", generateQuiz);

export default router;
