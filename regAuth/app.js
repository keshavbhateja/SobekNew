var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./model/User");
var path = require("path");
var session = require("express-session");
var cookieSession = require("cookie-session");
var keys = require("../auth-server/config/keys");
require("../auth-server/models/User");
require("../auth-server/services/passport");


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './css')));




mongoose.connect(
  "mongodb+srv://musoliman14:wZ98qneVk1yMd8YL@sobek.yibtuka.mongodb.net/test"
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);

require('../auth-server/routes/authRoutes')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  return res.status(200).json(user);
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        // render the home.html page if login is successful
        return res.sendFile(path.join(__dirname, "Public/html/PlanTrip.html"));

      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});


//Handling user logout
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}



console.log("Hi Im here");
var port = process.env.PORT || 5500;
app.listen(port, function () {
  console.log("Server Has Started");
});
