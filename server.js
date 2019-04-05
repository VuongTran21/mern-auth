const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');

const app = express();

// load env 
require('dotenv').config();

// middleware
app.use(
    bodyParse.urlencoded({
        extended: false
    })
);

app.use(bodyParse.json());

// connect DB
const mongodbUri = process.env.NODE_ENV === 'production' ? process.env.MLAB_MONGODB_URL : process.env.LOCAL_MONGODB_URL;

mongoose.connect(
    mongodbUri,
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

// Enable CORS on server
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// routes
app.use('/api/users', users);

const port = process.env.PORT || 5003;

app.listen(port, () => {
    `Server is listening on ... ${port}`
});