var express = require('express');
var cors = require('cors');
var db = require('./db'); // include in memory db

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// POST route for login
app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    let token = db.login(email, password);
    if(token != "") {
        res.status(200).json({
            message: "Login worked!",
            token: token
        })
    }
    else {
        res.status(400).json({});
    }
})

// POST route for signup
app.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    let token = db.signup(email, password);
    if(token != "") {
        res.status(200).json({
            message: "SignUp worked!",
            token: token
        })
    }
    else {
        res.status(400).json({});
    }
})

app.post('/highscore', (req, res, next) => {
    const { email, score, token } = req.body;
    if(db.isAuthenticated(token)) {
        db.addHighscore(email, score);
        res.status(200).json({
            message: "Highscore inserted!"
        });
    }
    else {
        res.status(401).json({});
    }
})

app.get('/highscore', (req, res, next) => {
    const { token } = req.query; // not params!
    if(db.isAuthenticated(token)) {
        let highscores = db.getHighscores();
        res.status(200).json({
            highscores: highscores
        });
    }
    else {
        res.status(401).json({});
    }
})

app.post('/logout', (req, res, next) => {
    const { token } = req.body;
    if(db.isAuthenticated(token)) {
        db.deleteToken(token);
        res.status(200).json({
            message: "Logout successful!"
        });
    }
    else {
        res.status(401).json({});
    }
})

module.exports = app;