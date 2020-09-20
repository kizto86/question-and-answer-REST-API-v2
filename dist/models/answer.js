"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true,
    },
    question: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
}, {
    versionKey: false,
});
module.exports = mongoose_1.default.model("Answer", AnswerSchema);
