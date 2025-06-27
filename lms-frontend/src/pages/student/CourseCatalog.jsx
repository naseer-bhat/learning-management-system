import { useEffect, useState } from "react";
import API from "../../services/api";

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post(
        `/student/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Enrolled successfully!");
    } catch (err) {
      console.error("Enrollment failed", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Course Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-xl p-4 shadow-sm">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>
            <button
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              onClick={() => handleEnroll(course._id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
