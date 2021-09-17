const express = require("express");
const mongoose = require("mongoose");
require("./models/user.js");
const userdao = require("./dao/users");
const morgan = require("morgan"); //HTTP logger
const bodyParser = require("body-parser"); //json communication b-w client
const cors = require("cors"); // handling multiple ports , error
const { readdirSync } = require("fs"); // filesystem
const userRouter = require("./routes/user");
require("./socket/websocket");

//app
const app = express();

mongoose
  .connect("mongodb://localhost:27017/xsquare_db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERR ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use("/user", userRouter);
//userdao.init(); // One time for creating users

readdirSync("./routes").map((r) => {
  //reading all middlewares in routes folder
  app.use("/api", require("./routes/" + r));
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on the port ${port}`));
