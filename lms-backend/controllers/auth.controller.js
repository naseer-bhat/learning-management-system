import User from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import axios from 'axios'
// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
   

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    // Hash password
    const hashed = await argon2.hash(password);

    // Create user
    const user = await User.create({ name, email, password: hashed, role });

    //  Send welcome email
    try{
    await axios.post("https://microservices-kccr.onrender.com/api/sendmail", {
  to: user.email,
  subject: "You have Successfully Registered",
  template: "Welcome to LMS",
  data: { name: user.name}
}, {
  headers: {
    "api-key": process.env.EMAIL_API_KEY 
  }
}
);}
catch(emailErr){
    console.warn("📧 Email sending failed:", emailErr.message);

}
    res.status(201).json({ msg: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};
// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Verify password
    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ msg: "Login successful", token ,user});
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
