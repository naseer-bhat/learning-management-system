import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Instructor Dashboard</h2>
      <ul className="space-y-2">
        <li><Link to="/instructor/create-course" className="text-blue-600 underline">➕ Create New Course</Link></li>
        <li><Link to="/instructor/dashboard/courses" className="text-blue-600 underline">📘 My Courses</Link></li>
      </ul>
    </div>
  );
}
