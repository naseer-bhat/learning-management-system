import express from "express";
import {
  getAllUsers,
  getAllCourses,
  approveCourse,
  publishCourse,
} from "../controllers/admin/admin.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isAuthenticated, isAdmin);

router.get("/users", getAllUsers);
router.get("/courses", getAllCourses);
router.put("/courses/:id/approve", approveCourse);
router.put("/courses/:id/publish", publishCourse);

export default router;
