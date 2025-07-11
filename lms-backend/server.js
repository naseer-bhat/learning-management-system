import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import instructorRoutes from "./routes/instructor.routes.js";
import studentRoutes from "./routes/student.routes.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173" 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'))
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
