/**
 * Created by Tamir on 13/01/2017.
 */
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    rootPath = path.normalize(__dirname + '/../'),
    User = require('./models/user'),
    dataCtrl = require('./controllers/data.controller'),
    jwt = require('jwt-simple'),
    app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootPath + '/app')));
app.use('/node_modules', express.static(rootPath + '/node_modules'));

app.get('/api/data', dataCtrl.getData);
app.get('/api/data/:id', dataCtrl.getTripById);
app.put('/api/data/:id', dataCtrl.updateTrip);
app.post('/register', function (req, res) {
    User.findOne({email: req.body.email}, function (err, existingUser) {
        if(existingUser)
            return res.status(409).send({message: 'Email already exist'});
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        newUser.save(function (err) {
            createSendToken(newUser, res);
        })
    })
})
app.post('/login', function (req, res) {
    req.user = req.body;
    var searchUser = {
        email: req.user.email
    }
    
    User.findOne(searchUser, function (err, user) {
        if(err) throw err;
        if(!user)
            return res.status(401).send({message: 'Wrong email/password'})
        user.comparePasswords(req.user.password, function (err, isMatch) {
            if(err) throw err;
            if(!isMatch)
                return res.status(401).send({message: 'Wrong email/password'});
            createSendToken(user, res);
        });
    });
});
app.get('*', function (req, res) {
    res.sendFile(path.join(rootPath + '/app/index.html'));
    // res.sendStatus(404);
});

function createSendToken(user, res) {
    var payload = {
        sub: user.email
    }
    
    var token = jwt.encode(payload, 'shh..');
    
    res.status(200).send({
        user: user,
        token: token
    });
}

mongoose.connect('mongodb://localhost/sii');
mongoose.set('debug', true);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});