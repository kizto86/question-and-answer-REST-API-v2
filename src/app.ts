import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

const app = express();

module.exports = (opts: { MONGO_URI: string; PORT: number }) => {
  //parse json from the request/response body
  app.use(express.json());
  app.use(cors());
  //log https status code and route
  app.use(morgan("dev"));

  //Importing the route

  const questionRoute = require("./route/question");

  //Defining a route middleware
  app.use("/api/questions", questionRoute);

  interface Error {
    status?: number;
    message?: string;
  }

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to question and answer REST API" });
  });

  //Error handler for page/route not found

  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: { status?: number; message: string } = new Error(
      "Page Not found"
    );
    error.status = 404;
    next(error);
  });

  //Error handler for other types of error
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  //DB connection
  const db = async () => {
    await mongoose.connect(opts.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("database connected"));
    return db;
  };
  return {
    app,
    db,
    start: () =>
      db().then(() => {
        app.listen(opts.PORT, () => {
          console.log(`Q and A API is listening on ${opts.PORT}`);
        });
      }),
  };
};
