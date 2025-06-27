import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function AddLesson() {
  const { courseId } = useParams();
  const [lesson, setLesson] = useState({ title: "", content: "" });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    setLesson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/instructor/course/${courseId}/lessons`, lesson, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Lesson added!");
      setLesson({ title: "", content: "" });
    } catch (err) {
      console.error("Failed to add lesson", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📘 Add Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Lesson Content"
          value={lesson.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Lesson
        </button>
      </form>
    </div>
  );
}
