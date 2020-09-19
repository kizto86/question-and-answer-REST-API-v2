"use strict";

import express, { Application, Request, Response, NextFunction } from "express";
const router = express.Router();

function asyncHandler(cb: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
//Send a GET request to /api/questions to  READ a list of question
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({ response: "You sent me a GET request" });
  })
);

//Send a POST request to /api/questions to create a new question
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({ response: "You sent me a POST request", body: req.body });
  })
);

// Send a GET request to / questions/:qID/answers
//to read answers to a particular question
router.get(
  "/:qID/answers",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      response: "You sent me a Answer GET request to /answers",
      questionId: req.params.qID,
    });
  })
);

//Send a POST request to /api/questions/:qID/answer
//to create  a new answer for a particular question
router.post(
  "/:qID/answer",
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      response: "You sent me a POST request to /answer",
      questionId: req.params.qID,
      body: req.body,
    });
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
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      response: "You sent me a DELETE request",
      questionId: req.params.qID,
      answerId: req.params.aID,
    });
  })
);

module.exports = router;
