const express = require("express");
const connectDB = require("./db/connect");
const errorHandlingMiddleware = require("./middleware/error-handling");
const app = express();
const book = require("./routers/book");
const auth = require("./routers/auth");
require("dotenv").config();

//middleware
app.use(errorHandlingMiddleware);
app.use(express.json());

//route
app.use("/api/v1/", book);
app.use("/api/v1/", auth);

app.get("/", (req, res) => {
  res.status(200).send("All routes are available at /api/v1/");
});

app.get("*", (req, res) => {
  res.status(404).send("Route does not exits");
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
