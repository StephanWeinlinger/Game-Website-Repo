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
    const { email, password, country, city } = req.body;
    if(db.signup(email, password, country, city)) {
        res.status(200).json({
            message: "SignUp worked!"
        })
    }
    else {
        res.status(400).json({});
    }
})

app.post('/highscore', (req, res, next) => {
    const { score, token } = req.body;
    if(db.isAuthenticated(token)) {
        const { username } = db.getAuthUser(token);
        const scoreObject = db.getHighestScore(username);
        if(scoreObject == undefined || scoreObject.score < score) {
            db.removeHighscore(username);
            db.addHighscore(username, score);
            res.status(200).json({
                message: "Highscore inserted!"
            });
        }
        else {
            res.status(200).json({
                message: "No new highscore achieved!"
            });
        }
    }
    else {
        res.status(401).json({});
    }
})

app.get('/highscore', (req, res, next) => {
    let highscores = db.getHighscores();
    res.status(200).json({
        highscores: highscores
    });
})

app.post('/profile', (req, res, next) => {
    const { token } = req.body;
    if(db.isAuthenticated(token)) {
        const { username } = db.getAuthUser(token);
        const { country, city } = db.getUserInfo(username);
        const scoreObject = db.getHighestScore(username);
        let score = "Not available!"
        if(scoreObject != undefined) {
            score = scoreObject.score;
        }
        res.status(200).json({
            username: username,
            country: country,
            city: city,
            score: score
        })
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