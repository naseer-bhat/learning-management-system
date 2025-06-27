import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

// Instructor
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import AddLesson from "./pages/instructor/AddLesson";
import AddAssignment from "./pages/instructor/AddAssignment";
import LessonAssignments from "./pages/instructor/LessonAssignments";
import EvaluateSubmissions from "./pages/instructor/EvaluateSubmissions";
import InstructorCourseLessons from "./pages/instructor/CourseLessons";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import CourseCatalog from "./pages/student/CourseCatalog";
import CourseLessons from "./pages/student/CourseLessons";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Instructor Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/course/:courseId/add-lesson" element={<AddLesson />} />
          <Route path="/instructor/course/:courseId/lessons" element={<InstructorCourseLessons />} />
          <Route path="/instructor/lesson/:lessonId/assignment" element={<AddAssignment />} />
          <Route path="/instructor/lesson/:lessonId/assignments" element={<LessonAssignments />} />
          <Route path="/instructor/lesson/:lessonId/evaluate" element={<EvaluateSubmissions />} />
        </Route>

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<CourseCatalog />} />
          <Route path="/student/course/:courseId/lessons" element={<CourseLessons />} />
        </Route>

        {/* Fallback route */}
        <Route
          path="*"
          element={<div className="p-4 text-red-600">404 - Page not found</div>}
        />
      </Routes>
    </>
  );
}

export default App;
