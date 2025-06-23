import { Schema, model, Types } from "mongoose";

const enrollmentSchema = new Schema(
  {
    student: { type: Types.ObjectId, ref: "User", required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    progress: { type: Number, default: 0 },
    completedLessons: [{ type: Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true }
);

export default model("Enrollment", enrollmentSchema);
