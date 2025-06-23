import { Schema, model, Types } from "mongoose";

const assignmentSchema = new Schema(
  {
    lesson: { type: Types.ObjectId, ref: "Lesson", required: true },
    question: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default model("Assignment", assignmentSchema);
