require("dotenv").config();

const appOptions = {
    MONGO_URI: process.env.DB_CONNECTION,
    PORT: process.env.PRODUCTION_PORT,
};

const App = require("./app")(appOptions);

App.start();