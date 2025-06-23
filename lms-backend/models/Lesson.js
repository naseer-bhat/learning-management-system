import { Schema, model, Types } from "mongoose";

const lessonSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    content: String,
    video: String, // local path for uploaded video
  },
  { timestamps: true }
);

export default model("Lesson", lessonSchema);
