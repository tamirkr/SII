/**
 * Created by Tamir on 15/01/2017.
 */
var Data = require('../models/data'),
    jwt = require('jwt-simple');


exports.getData = function (req, res) {
    if(!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized!'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shh..');
    if(!payload.sub) {
        res.status(401).send({message: 'Authorization failed'});
    }
    Data.find({}, function (err, data) {
        if (err) return handleError(err);
        res.send(data);
        res.end();
    })
}

exports.getTripById = function (req, res) {
    Data.findOne({id: parseInt(req.params.id)}, function (err, data) {
        if (err) return handleError(err);
        res.send(data);
        res.end();
    })
}

exports.updateTrip = function (req, res) {
    Data.update({id: parseInt(req.params.id)},
        {
            $set: {
                operator: req.body.operator,
                branch: req.body.branch,
                lineNumber: req.body.lineNumber,
                entryPoint: req.body.entryPoint,
                endPoint: req.body.endPoint,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                dateCode: req.body.dateCode,
                catalogLineNumber: req.body.catalogLineNumber

            }
        }, function (err, user) {
            if (err) return handleError(err);
            res.send(user);
            res.end();
        })
}