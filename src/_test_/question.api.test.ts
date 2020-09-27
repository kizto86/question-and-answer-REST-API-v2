import { response } from "express";

const request = require("supertest");
const HttpStatus = require("http-status-codes");
const Question = require("../models/question");
const { app, db, ...apiTestUtil } = require("./apiTestUtil");

describe("/questions", () => {
  beforeEach(apiTestUtil.setUpDB);
  afterEach(apiTestUtil.tearDownDB);

  it("should return no questions initially", async () => {
    const response = await request(app).get("/api/questions");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });

  it("should return a single existing question", async () => {
    const testQuestion: {
      username: string;
      question_title: string;
      question_description: string;
    } = {
      username: "Mina",
      question_title: "swimming course",
      question_description: "How much is the swimming course",
    };
    const question = new Question(testQuestion);
    await question.save();
    const response = await request(app).get("/api/questions");
    delete response.body[0]["_id"];
    delete response.body[0]["created_at"];
    expect(response.body[0]).toEqual(testQuestion);
    expect(response.statusCode).toBe(200);
  });

  it("should support the creation of questions", () => {
    return request(app)
      .post("/api/questions")
      .send({
        username: "kingsley",
        question_title: "quiz",
        question_description: "The chicken or the egg which came first",
      })
      .expect(HttpStatus.CREATED)
      .then((response: any) =>
        expect(response.body).toEqual({
          message: "question created successfully",
        })
      );
  });

  it("should not accept question without username", () => {
    return request(app)
      .post("/api/questions")
      .send({
        question_title: "quiz",
        question_description: "The chicken or the egg which came first",
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("should not accept question without question title", () => {
    return request(app)
      .post("/api/questions")
      .send({
        username: "kingsley",
        question_description: "The chicken or the egg which came first",
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("should not accept question without question description", () => {
    return request(app)
      .post("/api/questions")
      .send({
        username: "kingsley",
        title: "quiz",
        question_title: "quiz",
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
