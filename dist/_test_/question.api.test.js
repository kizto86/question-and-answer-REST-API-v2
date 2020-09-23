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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const HttpStatus = require("http-status-codes");
const Question = require("../models/question");
const _a = require("./apiTestUtil"), { app, db } = _a, apiTestUtil = __rest(_a, ["app", "db"]);
describe("/questions", () => {
    beforeEach(apiTestUtil.setUpDB);
    afterEach(apiTestUtil.tearDownDB);
    it("should return no questions initially", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get("/api/questions");
        expect(response.body).toEqual({ "message": "No questions found" });
        expect(response.statusCode).toBe(400);
    }));
    it("should return a single existing question", () => __awaiter(void 0, void 0, void 0, function* () {
        const testQuestion = {
            username: "Mina",
            question_title: "swimming course",
            question_description: "How much is the swimming course"
        };
        const question = new Question(testQuestion);
        yield question.save();
        const response = yield request(app).get("/api/questions");
        delete response.body[0]["_id"];
        delete response.body[0]["created_at"];
        expect(response.body[0]).toEqual(testQuestion);
        expect(response.statusCode).toBe(200);
    }));
    it("should support the creation of questions", () => {
        return request(app)
            .post("/api/questions")
            .send({
            username: "kingsley",
            question_title: "quiz",
            question_description: "The chicken or the egg which came first",
        })
            .expect(HttpStatus.CREATED)
            .then((response) => expect(response.body).toEqual({ message: "question created successfully" }));
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
        return request(app).post("/api/questions").send({
            username: "kingsley",
            question_description: "The chicken or the egg which came first",
        })
            .expect(HttpStatus.BAD_REQUEST);
    });
    it("should not accept question without question description", () => {
        return request(app).post("/api/questions").send({
            username: "kingsley",
            title: "quiz",
            question_title: "quiz",
        })
            .expect(HttpStatus.BAD_REQUEST);
    });
});
