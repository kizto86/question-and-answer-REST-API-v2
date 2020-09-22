import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    question_title: {
      type: String,
      required: true,
    },
    question_description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
