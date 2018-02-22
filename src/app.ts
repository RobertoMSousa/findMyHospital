import * as express from "express";

import * as session from "express-session";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as path from "path";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";


const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGOLAB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
	() => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
	console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
	process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);


/**
 * Primary app routes.
 */
import nearestRoutes = require("./controllers/nearest/nearest-routes");

app.use("/nearest", nearestRoutes.Routes.index());

module.exports = app;