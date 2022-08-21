const { config } = require("dotenv");
const app = require("express")();
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRoutes = require('./routes/index');
const { errorMiddleware, corsMiddleware } = require("./util/middleware");

config();

require("./config/dbConfig").dbConnect();

// Jobs
require("./cron/job");

// Middleware
app.use(corsMiddleware);
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', indexRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Connected to PORT: " + PORT));
