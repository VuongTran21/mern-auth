const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const passport = require('passport');

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

// routes
app.use('/api/users', users);

const port = process.env.PORT || 5003;

app.listen(port, () => {
    `Server is listening on ... ${port}`
});