import { useState } from "react";
import API from "../../services/api";

export default function CreateCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    image: "",
  });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    setCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/instructor/courses", course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Course created!");
      setCourse({ title: "", description: "", image: "" });
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Create Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={course.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={course.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={course.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create
        </button>
      </form>
    </div>
  );
}
