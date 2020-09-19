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
const router = express_1.default.Router();
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
//Send a GET request to /api/questions to  READ a list of question
router.get("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ response: "You sent me a GET request" });
})));
//Send a POST request to /api/questions to create a new question
router.post("/", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ response: "You sent me a POST request", body: req.body });
})));
// Send a GET request to / questions/:qID/answers
//to read answers to a particular question
router.get("/:qID/answers", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        response: "You sent me a Answer GET request to /answers",
        questionId: req.params.qID,
    });
})));
//Send a POST request to /api/questions/:qID/answer
//to create  a new answer for a particular question
router.post("/:qID/answer", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        response: "You sent me a POST request to /answer",
        questionId: req.params.qID,
        body: req.body,
    });
})));
//Send a PUT request to /questions/:qID/answer/:aID
//to edit  a answer for a particular question
router.put("/:qID/answer/:aID", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        response: "You sent me an UPDATE request",
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body,
    });
})));
//Send a DELETE request to /questions/:qID/answer/:aID
//to delete  an answer for a particular question
router.delete("/:qID/answer/:aID", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        response: "You sent me a DELETE request",
        questionId: req.params.qID,
        answerId: req.params.aID,
    });
})));
module.exports = router;
