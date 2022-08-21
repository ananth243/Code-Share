const { config } = require("dotenv");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRoutes = require("./routes/index");
const { errorMiddleware, corsMiddleware } = require("./util/middleware");

const app = express();
config();

require("./config/dbConfig").dbConnect();

// Jobs
require("./cron/job");

// Middleware
app.use(corsMiddleware);
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/v1", indexRoutes);

// Bundle React App for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Base middleware for all errors
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Connected to PORT: " + PORT));
