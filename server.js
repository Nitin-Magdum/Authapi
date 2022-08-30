const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const dbstore = require("connect-mongodb-session")(session);
const cors = require("cors");
const UserModel = require("./models/UserModel");
const routes = require("./routers/UserRoutes");
const repo = require("./repository/UserRepository");
const app = express();
// const DB_URI = 'mongodb://127.0.0.1:27017/AuthDB';
const MONGO_URI='mongodb+srv://RajaDhurai:wIPHhwXDT1u6Zpep@cluster0.fgvpdxc.mongodb.net/test'
const DB_URI = MONGO_URI;
const store = new dbstore({
  uri: DB_URI,
  collection: "app-sessions",
});

mongoose.connect(DB_URI);
mongoose.connection.once("open", (err) => {
  if (!err) {
    console.log("Connected to DB");
  }
});

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  session({
    secret: "News App Project",
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    store: store,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(repo.LoginUser());
app.use("/api/v1/", routes);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});
const port = 7000 | process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;