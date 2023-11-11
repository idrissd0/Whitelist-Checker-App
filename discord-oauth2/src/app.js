require('dotenv').config();
const express   = require('express');
const app       = express();
const PORT      = process.env.PORT || 3021;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordStrategy');

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false, // Set to false to avoid the deprecated warning
    saveUninitialized: false,
}));

// passport

app.use(passport.initialize());
app.use(passport.session());

//  Routes
const authRoute = require('./routes/auth');

// Middlewares
app.use('/auth', authRoute);



app.listen(PORT, () => {
    console.log(`Now listening to requets on PORT ${PORT}`);
})
