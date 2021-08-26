/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import mongoose from "mongoose";
import app from "../app";
import logger from "../utils/logger";
import config from "../config/config";

// get the host and port name
const { dbUrl } = config.mongoDbDetails;
const { port, hostName } = config.serverDetails;

const url = dbUrl;

// Connect mongo to the database
const mongoDB = mongoose.connect(url, {
  userNewUrlParser: true,
  userUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo Connection disconnected"));
db.once("open", () => {
  console.log("MongoDB connection has been established.");
});

// finally, let's start our server...
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.info(`Listening on ${hostName}: ${server.address().port}`);
});

process.on("SIGINT", () => {
  logger.info("Server shutting down");
  logger.info("Server shut down success");
  process.exit(0);
});

export default mongoDB;
