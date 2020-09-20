"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const QuestionSchema = new Schema({
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
}, {
    versionKey: false,
});
module.exports = mongoose_1.default.model("Question", QuestionSchema);
