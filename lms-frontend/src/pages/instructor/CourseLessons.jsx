import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";

export default function CourseLessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const [newLesson, setNewLesson] = useState({ title: "", content: "" });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchLessons = async () => {
    try {
      const res = await API.get(`/instructor/course/${courseId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(res.data.lessons);
      setCourse(res.data.course);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const handleChange = (e) => {
    setNewLesson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        `/instructor/course/${courseId}/lessons`,
        newLesson,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewLesson({ title: "", content: "" });
      fetchLessons();
    } catch (err) {
      console.error("Failed to add lesson", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Lessons for: {course?.title}</h2>

      <form onSubmit={handleAddLesson} className="mb-6 space-y-4 border p-4 rounded">
        <h3 className="text-xl font-semibold">➕ Add Lesson</h3>
        <input
          name="title"
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Lesson Content"
          value={newLesson.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Lesson
        </button>
      </form>

      {lessons.length === 0 ? (
        <p>No lessons added yet.</p>
      ) : (
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li key={lesson._id} className="border p-4 rounded shadow-sm">
              <h4 className="text-lg font-bold">{lesson.title}</h4>
              <p className="text-gray-700">{lesson.content}</p>
              <Link
                to={`/instructor/lesson/${lesson._id}/assignment`}
                className="mt-2 inline-block bg-indigo-600 text-white px-3 py-1 rounded"
              >
                ➕ Add Assignment
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
