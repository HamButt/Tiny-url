const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const bodyParser = require('body-parser')
const passport = require('passport');
require('./passports/passport')


app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(
    session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie:{
        httpOnly: true,
        maxAge: parseInt(process.env.MAX_AGE)
    }
}))

app.use(passport.initialize())
app.use(passport.session());

app.use('/', require('./routes/shortUrl.route'))
app.use('/createUrl',require('./routes/longUrl.route'))
app.use('/signUp', require('./routes/signUp.route'))
app.use('/auth',  require('./routes/auth.route'))


app.listen(5000, ()=>{
    console.log("server is running on 5000")
})
