var mongoose = require('mongoose');


var DrawingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: []
});

var Drawing = mongoose.model('Drawing', DrawingSchema);

module.exports = Drawing;