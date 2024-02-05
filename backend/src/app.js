const express = require("express");

const app = express();

/* ************************************************************************* */

// Config CORS

const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // keep this one, after checking the value in `backend/.env`
    ],
  })
);

/* ************************************************************************* */

// Config express to parse JSON

app.use(express.json());

/* ************************************************************************* */

// Import the API routes from the router module
const router = require("./router");

// Mount the API routes under the "/api" endpoint
app.use("/api", router);

/* ************************************************************************* */

module.exports = app;
