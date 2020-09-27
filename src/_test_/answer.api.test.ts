import { response } from "express";

const request = require("supertest");
const HttpStatus = require("http-status-codes");
const Answer = require("../models/answer");
const { app, db, ...apiTestUtil } = require("./apiTestUtil");

describe("/api/answer", () => {
  beforeEach(apiTestUtil.setUpDB);
  afterEach(apiTestUtil.tearDownDB);
  it("should support the creation of an answer", () => {
    const id = "5f461c180d208526bc470144";
    return request(app)
      .post("/api/questions/5f6763d4f8105c217e1243d4/answer")
      .send({
        answer: "Running reduces the risk of high blood",
        question: "5f6763d4f8105c217e1243d4",
      })
      .expect(HttpStatus.CREATED)
      .then((res: any) =>
        expect(res.body).toEqual({ message: "Answer created successfully" })
      );
  });

  it("should return an existing answer", async () => {
    const testAnswer = {
      answer: "jogging is slow while running is faster",
      question: "5f6763d4f8105c217e1243d4",
    };
    const answer = new Answer(testAnswer);
    await answer.save();

    const response = await request(app).get(
      "/api/questions/5f6763d4f8105c217e1243d4/answers/"
    );
    delete response.body.answers[0]["_id"];
    expect(response.body.answers[0]).toEqual(testAnswer);
    expect(HttpStatus.OK);
  });
});
