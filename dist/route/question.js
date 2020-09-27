"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
const Question = require("../models/question");
const Answer = require("../models/answer");
function asyncHandler(cb) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield cb(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
}
//Send a GET request to /api/questions to  READ a list of questions
router.get("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const offset = req.query.offset | 0;
    //const limit = req.query.limit | 0 || 20;
    const questions = yield Question.find();
    res.json(questions);
})));
//Send a POST request to /api/questions to create a new question
router.post("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = req.body;
    if (question.username &&
        question.question_title &&
        question.question_description) {
        const savedQuestion = new Question({
            username: question.username,
            question_title: question.question_title,
            question_description: question.question_description,
        });
        yield savedQuestion.save();
        res.status(201).json({
            message: "question created successfully",
        });
    }
    else {
        res.status(400).json({
            message: "username, question_title and question_description are required",
        });
    }
})));
// Send a GET request to / questions/:id/answers
//to read answers to a particular question
router.get("/:id/answers", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const savedQuestion = yield Question.findById(req.params.id);
    const savedAnswer = yield Answer.find({
        question: req.params.id,
    });
    res.json({
        message: "Answers fetched successfully",
        question: savedQuestion,
        answers: savedAnswer,
    });
})));
//Send a POST request to /api/questions/answer
//to create  a new answer for a particular question
router.post("/:id/answer", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = req.body;
    console.log(req.body);
    if (response.answer) {
        const answer = new Answer({
            answer: response.answer,
            question: mongoose_1.default.Types.ObjectId(req.params.id),
        });
        yield answer.save();
        res.status(201).json({
            message: "Answer created successfully",
        });
    }
    else {
        res.status(404).json({ message: "answer is required" });
    }
})));
module.exports = router;
