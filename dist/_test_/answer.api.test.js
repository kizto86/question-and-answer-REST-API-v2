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
const Answer = require("../models/answer");
const _a = require("./apiTestUtil"), { app, db } = _a, apiTestUtil = __rest(_a, ["app", "db"]);
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
            .then((res) => expect(res.body).toEqual({ message: "Answer created successfully" }));
    });
    it("should return an existing answer", () => __awaiter(void 0, void 0, void 0, function* () {
        const testAnswer = {
            answer: "jogging is slow while running is faster",
            question: "5f6763d4f8105c217e1243d4",
        };
        const answer = new Answer(testAnswer);
        yield answer.save();
        const response = yield request(app).get("/api/questions/5f6763d4f8105c217e1243d4/answers/");
        delete response.body.answers[0]["_id"];
        expect(response.body.answers[0]).toEqual(testAnswer);
        expect(HttpStatus.OK);
    }));
});
