const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('../regAuth/config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');

mongoose.connect('mongodb+srv://musoliman14:wZ98qneVk1yMd8YL@sobek.yibtuka.mongodb.net/test');

const app = express();


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5500;
app.listen(PORT);
