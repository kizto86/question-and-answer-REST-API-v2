import mongoose from "mongoose";
const { Schema } = mongoose;

interface Question {
  username: string;
  question_title: string;
  question_description: string;
}

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
