"use strict";

import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const router = express.Router();
const Question = require("../models/question");
const Answer = require("../models/answer");

function asyncHandler(cb: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
//Send a GET request to /api/questions to  READ a list of questions
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const questions: String = await Question.find();
    if (questions.length == 0) {
      res.status(404).json({ message: "No questions found" });
    } else {
      res.json({ message: "question found", question: questions });
    }
  })
);

//Send a POST request to /api/questions to create a new question
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const question: {
      username: string;
      question_title: string;
      question_description: string;
    } = req.body;
    if (
      question.username &&
      question.question_title &&
      question.question_description
    ) {
      const savedQuestion = new Question({
        username: question.username,
        question_title: question.question_title,
        question_description: question.question_description,
      });
      await savedQuestion.save();
      res.status(201).json({
        message: "question created successfully",
      });
    } else {
      res.status(400).json({
        message:
          "username, question_title and question_description are required",
      });
    }
  })
);

// Send a GET request to / questions/:qID/answers
//to read answers to a particular question
router.get(
  "/:qID/answers",
  asyncHandler(async (req: Request, res: Response) => {
    const savedQuestion: string = await Question.findById(req.params.qID);
    const savedAnswer: string = await Answer.find({ question: req.params.qID });
    res.json({
      message: "Answer fetched successful",
      question: savedQuestion,
      answers: savedAnswer,
    });
  })
);

//Send a POST request to /api/questions/:qID/answer
//to create  a new answer for a particular question
router.post(
  "/:qID/answer",
  asyncHandler(async (req: Request, res: Response) => {
    const response: { answer: string } = req.body;
    if (response.answer) {
      const answer = new Answer({
        answer: response.answer,
        question: mongoose.Types.ObjectId(req.params.qID),
      });
      await answer.save();
      res.status(201).json({
        message: "Answer created successfully ",
      });
    } else {
      res.status(404).json({ message: "answer is required" });
    }
  })
);

//Send a PUT request to /questions/:qID/answer/:aID
//to edit  a answer for a particular question
router.put(
  "/:qID/answer/:aID",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      response: "You sent me an UPDATE request",
      questionId: req.params.qID,
      answerId: req.params.aID,
      body: req.body,
    });
  })
);

//Send a DELETE request to /questions/:qID/answer/:aID
//to delete  an answer for a particular question
router.delete(
  "/:qID/answer/:aID",
  asyncHandler(async (req: Request, res: Response) => {})
);

module.exports = router;
