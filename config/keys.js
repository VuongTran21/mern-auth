// mongodb://hoangvuong:123123XXX@ds125526.mlab.com:25526/hoangvuong-db
// mongodb://<dbuser>:<dbpassword>@ds113505.mlab.com:13505/mern-auth-demo
// mongodb://127.0.0.1:27017/mern-auth
// console.log('process env', process.env);
module.exports = {
    mongoURI: "mongodb://hoangvuong:123123XXX@ds113505.mlab.com:13505/mern-auth-demo",
    secretOrKey: "secret"
};

// process.env.NODE_ENV === 'production' ? process.env.MLAB_MONGODB_URL : process.env.LOCAL_MONGODB_URL