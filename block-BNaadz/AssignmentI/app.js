var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");
var commentrouter = require("./routes/comment");
var mongoose = require("mongoose");
var session = require("express-session");
var flash = require("connect-flash");
var auth = require("./middlewares/auth");
// var MongoStore = require('connect-mongo')(session);
require("dotenv").config();
var app = express();
mongoose.connect(
  "mongodb://localhost/UserLogin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
// view engine setup

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  
  })
);
app.use(flash());
// app.use(auth.UserInfo);
app.use("/articles", articleRouter);

app.use("/comments", commentrouter);

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render("error");
});

module.exports = app;
