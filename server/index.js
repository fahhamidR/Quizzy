const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

const database = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// connect to db
database.connectToDB();

app.use(express.json());
app.use(cookieParser());
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "https://quizzy-frontend-71c6.onrender.com";

console.log(`Using CORS origin: ${ALLOWED_ORIGIN}`);

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
    maxAge: 14400,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Ensure preflight requests are handled for all routes
app.options("*", cors({ origin: ALLOWED_ORIGIN, credentials: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.use("/api/v1/", routes);

// activate server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
