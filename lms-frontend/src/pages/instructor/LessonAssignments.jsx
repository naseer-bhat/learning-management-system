import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function LessonAssignments() {
  const { lessonId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await API.get(`/instructor/lesson/${lessonId}/assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      }
    };

    fetchAssignments();
  }, [lessonId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 Assignments for Lesson</h2>

      {assignments.length === 0 ? (
        <p>No assignments available for this lesson.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment._id} className="border p-4 rounded shadow-sm">
              <p className="text-gray-800">{assignment.question}</p>
              <p className="text-sm text-gray-500">Max Marks: {assignment.maxMarks}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
