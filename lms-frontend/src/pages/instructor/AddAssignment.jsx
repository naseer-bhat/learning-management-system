import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function AddAssignment() {
  const { lessonId } = useParams();
  const [assignment, setAssignment] = useState({ question: "", maxMarks: "" });
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    setAssignment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        `/instructor/lesson/${lessonId}/assignment`,
        assignment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Assignment added!");
      setAssignment({ question: "", maxMarks: "" });
    } catch (err) {
      console.error("Failed to add assignment", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Add Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="question"
          placeholder="Assignment Question"
          value={assignment.question}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="maxMarks"
          type="number"
          placeholder="Max Marks"
          value={assignment.maxMarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Assignment
        </button>
      </form>
    </div>
  );
}
