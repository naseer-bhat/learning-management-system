import { Schema, model, Types } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, default: 0 },
    image: String,
    instructor: { type: Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, default: false },
    approvedByAdmin: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Course", courseSchema);
