import LessonModel from "../models/lesson.model.js";

const lessonController = {
  createLesson: async (req, res) => {
    try {
      const lesson = new LessonModel(req.body);
      await lesson.save();
      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating lesson: " + error.message,
      });
    }
  },

  getAllLessons: async (req, res) => {
    try {
      const { courseId } = req.query;
      const filter = courseId ? { courseId } : {};
      const lessons = await LessonModel.find(filter).populate("courseId");
      res.json({
        success: true,
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching lessons: " + error.message,
      });
    }
  },

  getLessonById: async (req, res) => {
    try {
      const lesson = await LessonModel.findById(req.params.id).populate(
        "courseId"
      );
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found",
        });
      }
      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching lesson: " + error.message,
      });
    }
  },

  updateLesson: async (req, res) => {
    try {
      const lesson = await LessonModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found",
        });
      }
      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating lesson: " + error.message,
      });
    }
  },

  deleteLesson: async (req, res) => {
    try {
      const lesson = await LessonModel.findByIdAndDelete(req.params.id);
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found",
        });
      }
      res.json({
        success: true,
        message: "Lesson deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting lesson: " + error.message,
      });
    }
  },
};

export default lessonController;
