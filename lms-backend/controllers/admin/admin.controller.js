import User from "../../models/User.js";
import Course from "../../models/Course.js";

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users", error: err.message });
  }
};

// ✅ Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch courses", error: err.message });
  }
};

// ✅ Approve course
export const approveCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { approvedByAdmin: true },
      { new: true }
    );
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json({ msg: "Course approved", course });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed", error: err.message });
  }
};

// ✅ Publish course
export const publishCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { published: true },
      { new: true }
    );
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json({ msg: "Course published", course });
  } catch (err) {
    res.status(500).json({ msg: "Publishing failed", error: err.message });
  }
};
