import Enrollment from "../../models/Enrollment.js";
import Course from "../../models/Course.js";
import Submission from "../../models/Submission.js";
import Assignment from "../../models/Assignment.js";
import Lesson from "../../models/Lesson.js";
import generateQuizFromLesson from "../../utils/aiQuizGenerator.js";

// ✅ Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const existing = await Enrollment.findOne({
      course: courseId,
      student: req.user.id,
    });

    if (existing)
      return res.status(400).json({ msg: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({
      course: courseId,
      student: req.user.id,
    });

    res.status(201).json({ msg: "Enrollment successful", enrollment });
  } catch (err) {
    res.status(500).json({ msg: "Enrollment failed", error: err.message });
  }
};

// ✅ Get enrolled courses
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: "course",
        populate: { path: "instructor", select: "name email" },
      })
      .populate("completedLessons");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load courses", error: err.message });
  }
};

// ✅ Mark lesson as complete
export const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      completedLessons: { $ne: lessonId },
    });

    if (!enrollment) return res.status(404).json({ msg: "Enrollment not found" });

    enrollment.completedLessons.push(lessonId);

    const courseLessons = await Lesson.find({ course: enrollment.course });
    const total = courseLessons.length;
    const completed = enrollment.completedLessons.length;

    enrollment.progress = Math.round((completed / total) * 100);
    await enrollment.save();

    res.json({ msg: "Lesson marked as completed", progress: enrollment.progress });
  } catch (err) {
    res.status(500).json({ msg: "Failed to mark lesson", error: err.message });
  }
};

// ✅ Submit assignment
export const submitAssignment = async (req, res) => {
  try {
    const { answer } = req.body;
    const assignmentId = req.params.assignmentId;

    const exists = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id,
    });

    if (exists) return res.status(400).json({ msg: "Already submitted" });

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user.id,
      answer,
    });

    res.status(201).json({ msg: "Assignment submitted", submission });
  } catch (err) {
    res.status(500).json({ msg: "Failed to submit assignment", error: err.message });
  }
};

// ✅ View own submissions
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
      .populate("assignment", "question")
      .populate("student", "name");

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load submissions", error: err.message });
  }
};

// ✅ AI-powered quiz generation
export const generateQuiz = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    const quiz = await generateQuizFromLesson(lesson.content);
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ msg: "Quiz generation failed", error: err.message });
  }
};
