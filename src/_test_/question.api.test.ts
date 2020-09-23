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
});
