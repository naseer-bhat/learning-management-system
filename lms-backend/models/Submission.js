import { Schema, model, Types } from "mongoose";

const submissionSchema = new Schema(
  {
    assignment: { type: Types.ObjectId, ref: "Assignment", required: true },
    student: { type: Types.ObjectId, ref: "User", required: true },
    answer: { type: String, required: true },
    marksObtained: { type: Number, default: 0 },
    evaluated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Submission", submissionSchema);
