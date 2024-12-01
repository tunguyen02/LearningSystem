import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    videos: [
      {
        title: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
        watched: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const LessonModel = mongoose.model("Lesson", lessonSchema);
export default LessonModel;
