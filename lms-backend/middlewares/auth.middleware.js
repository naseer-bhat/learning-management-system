import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized", error: err.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Access denied: Admin only" });
  next();
};

export const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor")
    return res.status(403).json({ msg: "Access denied: Instructor only" });
  next();
};

export const isStudent = (req, res, next) => {
  if (req.user.role !== "student")
    return res.status(403).json({ msg: "Access denied: Student only" });
  next();
};
