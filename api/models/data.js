/**
 * Created by Tamir on 15/01/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataSchema = new Schema({
    id: Number,
    operator: String,
    branch: String,
    catalogLineNumber: Number,
    lineNumber: Number,
    entryPoint: String,
    endPoint: String,
    fromDate: String,
    toDate: String,
    dateCode: String
})

module.exports = mongoose.model('Data', DataSchema);