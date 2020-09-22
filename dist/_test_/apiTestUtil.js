"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const testOptions = {
    MONGO_URI: "mongodb://localhost:27017/Q_and_A-Test",
    PORT: process.env.TEST_PORT,
};
const app = require("../app")(testOptions);
module.exports = {
    setUpDB: app.db,
    tearDownDB: () => mongoose.connection.db.dropDatabase(),
    app: app.app,
    db: app.db,
};
