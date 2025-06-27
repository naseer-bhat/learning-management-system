import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await API.get("/student/enrollments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnrollments(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch enrollments:", err);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 My Enrolled Courses</h2>

      {enrollments.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.map((enroll) => (
            <div key={enroll._id} className="border rounded-xl p-4 shadow-sm">
              <img
                src={enroll.course.image}
                alt={enroll.course.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{enroll.course.title}</h3>
              <p className="text-sm text-gray-600">{enroll.course.description}</p>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-green-600 rounded"
                    style={{ width: `${enroll.progress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{enroll.progress}% completed</p>
              </div>

              <Link to={`/student/course/${enroll.course._id}/lessons`}>
                <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                  View Lessons
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
