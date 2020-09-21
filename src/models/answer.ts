import mongoose from "mongoose";
const { Schema } = mongoose;


const AnswerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Answer", AnswerSchema);
