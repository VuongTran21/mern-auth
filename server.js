const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

// middleware
app.use(
    bodyParse.urlencoded({
        extended: false
    })
);

app.use(bodyParse.json());

app.use(express.static('client/build'));

// connect DB
const db = require('./config/keys').mongoURI;

mongoose.connect(
    db,
    {
        useNewUrlParser: true
    }
)
.then(() => console.log("MongoDB connected."))
.catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// routes
app.use('/api/users', users);

const port = process.env.PORT || 5003;

app.listen(port, () => {
    `Server is listening on ... ${port}`
});