import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function CourseLessons() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await API.get(`/student/course/${courseId}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLessons(res.data);
      } catch (err) {
        console.error("Failed to fetch lessons", err);
      }
    };
    fetchLessons();
  }, [courseId]);

  const handleAnswerChange = (assignmentId, value) => {
    setAnswers((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const handleSubmit = async (assignmentId) => {
    try {
      await API.post(
        `/student/assignment/${assignmentId}/submit`,
        { answer: answers[assignmentId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Submitted!");
    } catch (err) {
      console.error("Failed to submit assignment", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Course Lessons</h2>

      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        lessons.map((lesson) => (
          <div key={lesson._id} className="border p-4 mb-6 rounded shadow-sm">
            <h3 className="text-xl font-semibold">{lesson.title}</h3>
            <p className="text-gray-700 mb-4">{lesson.content}</p>

            {/* Assignments (if any) */}
            {lesson.assignments?.length > 0 && (
              <div className="space-y-4">
                {lesson.assignments.map((assignment) => (
                  <div
                    key={assignment._id}
                    className="border p-3 rounded bg-gray-100"
                  >
                    <p className="font-semibold">{assignment.question}</p>
                    <textarea
                      placeholder="Your answer"
                      className="w-full border rounded p-2 mt-2"
                      value={answers[assignment._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(assignment._id, e.target.value)
                      }
                    />
                    <button
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleSubmit(assignment._id)}
                    >
                      Submit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
