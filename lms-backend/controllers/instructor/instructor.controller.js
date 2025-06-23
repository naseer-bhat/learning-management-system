import Course from "../../models/Course.js";
import Lesson from "../../models/Lesson.js";
import Assignment from "../../models/Assignment.js";
import Submission from "../../models/Submission.js";

// ✅ Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, image } = req.body;
    const course = await Course.create({
      title,
      description,
      category,
      price,
      image,
      instructor: req.user.id,
    });
    res.status(201).json({ msg: "Course created", course });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create course", error: err.message });
  }
};

// ✅ Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user.id },
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json({ msg: "Course updated", course });
  } catch (err) {
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};

// ✅ Delete course
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.id,
    });
    if (!deleted) return res.status(404).json({ msg: "Course not found" });
    res.json({ msg: "Course deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed", error: err.message });
  }
};

// ✅ Add lesson to a course
export const addLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    const lesson = await Lesson.create({
      title,
      content,
      video: req.file?.path || "",
      course: req.params.courseId,
    });
    res.status(201).json({ msg: "Lesson added", lesson });
  } catch (err) {
    res.status(500).json({ msg: "Lesson creation failed", error: err.message });
  }
};

// ✅ Create assignment for a lesson
export const createAssignment = async (req, res) => {
  try {
    const { question, maxMarks } = req.body;
    const assignment = await Assignment.create({
      lesson: req.params.lessonId,
      question,
      maxMarks,
    });
    res.status(201).json({ msg: "Assignment created", assignment });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create assignment", error: err.message });
  }
};

// ✅ Get all submissions for a lesson
export const getSubmissionsByLesson = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const assignments = await Assignment.find({ lesson: lessonId });

    const assignmentIds = assignments.map((a) => a._id);
    const submissions = await Submission.find({ assignment: { $in: assignmentIds } })
      .populate("student", "name email")
      .populate("assignment", "question");

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to get submissions", error: err.message });
  }
};

// ✅ Get all submissions for an assignment
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const submissions = await Submission.find({ assignment: assignmentId })
      .populate("student", "name email")
      .populate("assignment", "question");
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to get submissions", error: err.message });
  }
};

// ✅ Evaluate submission
export const evaluateSubmission = async (req, res) => {
  try {
    const { marksObtained } = req.body;
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { marksObtained, evaluated: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Submission not found" });
    res.json({ msg: "Submission evaluated", updated });
  } catch (err) {
    res.status(500).json({ msg: "Evaluation failed", error: err.message });
  }
};
