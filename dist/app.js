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
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
module.exports = (opts) => {
    //parse json from the request/response body
    app.use(express_1.default.json());
    app.use(cors_1.default());
    //log https status code and route
    app.use(morgan_1.default("dev"));
    //Importing the route
    const questionRoute = require("./route/question");
    //Defining a route middleware
    app.use("/api/questions", questionRoute);
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to question and answer REST API" });
    });
    //Error handler for page/route not found
    app.use((req, res, next) => {
        const error = new Error("Page Not found");
        error.status = 404;
        next(error);
    });
    //Error handler for other types of error
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message,
            },
        });
    });
    //DB connection
    const db = () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(opts.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("database connected"));
        return db;
    });
    return {
        app,
        db,
        start: () => db().then(() => {
            app.listen(opts.PORT, () => {
                console.log(`Q and A API is listening on ${opts.PORT}`);
            });
        }),
    };
};
