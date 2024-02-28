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
var keys = require("./config/keys");
const { Script } = require("vm");
require("../auth-server/models/User");
require("../auth-server/services/passport");
const MongoClient = require('mongodb').MongoClient;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User1 = mongoose.model('users');



var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('views', './views');
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, './css')));

// app.use(express.static(path.join(__dirname, './html')));
// app.use(express.static(path.join(__dirname, './views')));


app.use(express.static('Public'));

mongoose.connect(
  "mongodb+srv://musoliman14:wZ98qneVk1yMd8YL@sobek.yibtuka.mongodb.net/test"
);
// app.set("views", path.join(__dirname, "vC:\Users\LEG"));
// app.set('views', path.join(__dirname, 'public', 'html'));



// app.set("view engine", "ejs");
app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




/////////////////////////////






passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
User.findById(id)
  .then(user => {
    done(null,user);
  });


});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User1.findOne({ googleId: profile.id})
       .then((existingUser) => {
        if (existingUser){
          // we already have a record with the given profile ID
          done(null, existingUser);

        } else {
          // we dont have a user record with this ID, make a new record
          new User1({ googleId: profile.id, displayName: profile.displayName })
           .save()
          .then(user => done(null, user));
        }
      })

     
    }
  )
);


/////

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("main.ejs");
});

// // Showing secret page
// app.get("/secret", isLoggedIn, function (req, res) {
//   res.render("secret");
// });



// showing google oauth

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/homee',
    failureRedirect: '/login'
  })
);


app.get('/home', (req, res) => {
  return res.render("home")
  
});

app.get('api/logout', (req,res) => {
req.logout();
res.send(req.user);
});

  app.get('/api/current_user', (req, res) => {

    res.send(req.user);
  } )




  //showing routes for navbar elements

  app.get('/homee.ejs', (req, res) => {
    return res.render("homee");
    
  });

  app.get('/PlanTrip.ejs', (req, res) => {
    res.render("PlanTrip");
  });
  

  app.get('/ServiceHours.ejs', (req, res) => {
    res.render("ServiceHours");
  });


  app.get('/ServiceHours.ejs', (req, res) => {
    res.render("ServiceHours");
  });


  app.get('/busdriver.ejs', (req, res) => {
    res.render("busdriver");
  });

  app.get('/form.ejs', (req, res) => {
    res.render("form");
  });

  app.post('/TripConfirmation', (req, res) => {

    res.send(`Full name is:${req.body.route4} ${req.body.route5}`);
  });

  //import {routeSelect, pickupSelect} from 'regAuth/views/PlanTrip.ejs';
  app.get('/TripConfirmation', async (req, res) => {

    
    return res.render("TripConfirmation.ejs", {routeSelect: "Route 1,", 
    pickupSelect: "Zezenia"});
  });
  
 
  app.post('/sub', (req, res) => {
    // Get the data from the two forms.
    const form1Data = req.body.form1;
    const form2Data = req.body.form2;

    const collection = test.collection('trips');
  
    // Save the data to the collection.
    
    const trip = trips.create({
      route: form1Data,
      stop: form2Data
    });
    


  

  
    // Send a response to the client.
    res.send('Your trip has been confirmed!');
  });

  //

// app.post('/submit-form', (req, res) => {
//   const selectedOption = req.body.selectedOption;
//   console.log(`Selected option: ${selectedOption}`);
// });


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
  

  return res.render("login");
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
        
        res.render("homee.ejs");

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











