const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connection = require("./helpers/db");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

const userRoute = require("./routes/userRouter");
const thirdPartyRoute = require("./routes/thirdPartyRoute");

app.use("/user", userRoute);
app.use("/api", thirdPartyRoute);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Running on server ${PORT}`);
  } catch (ex) {
    console.log(ex);
  }
});
