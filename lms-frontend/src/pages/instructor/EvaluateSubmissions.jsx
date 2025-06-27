import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function EvaluateSubmissions() {
  const { lessonId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get(`/instructor/lesson/${lessonId}/submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      }
    };

    fetchSubmissions();
  }, [lessonId]);

  const handleMarksChange = (index, value) => {
    const updated = [...submissions];
    updated[index].marks = value;
    setSubmissions(updated);
  };

  const handleEvaluate = async (submissionId, marks) => {
    try {
      await API.post(
        `/instructor/submission/${submissionId}/evaluate`,
        { marks },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Marks submitted successfully!");
    } catch (err) {
      console.error("Failed to submit marks", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Evaluate Submissions</h2>

      {submissions.length === 0 ? (
        <p>No submissions found for this lesson.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub, index) => (
            <div key={sub._id} className="border p-4 rounded shadow">
              <p><strong>Student:</strong> {sub.student?.name}</p>
              <p><strong>Answer:</strong> {sub.answer}</p>
              <p><strong>Submitted At:</strong> {new Date(sub.submittedAt).toLocaleString()}</p>
              <input
                type="number"
                placeholder="Marks"
                value={sub.marks || ""}
                onChange={(e) => handleMarksChange(index, e.target.value)}
                className="p-2 border rounded w-32 mt-2"
              />
              <button
                className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleEvaluate(sub._id, sub.marks)}
              >
                Submit Marks
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
