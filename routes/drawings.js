var express = require('express');
var Drawing = require('../services/drawings');
var router = express.Router();

var express = require('express');
//var Item = require('../services/item');
var router = express.Router();

router.get('/drawings', function(req, res) {
    Drawing.list(function(drawings) {
        return res.status(201).json(drawings);
       
    }, function(err) {
        return res.status(400).json(err);
    });
});


router.get('/drawings/:id', function(req, res) {
    Drawing.findOne(req.params.id,function(drawing) {
        res.
        res.status(201).json(drawing);
    }, function(err) {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/drawing', function(req, res) {
    Drawing.save(req.body.name, function(drawing) {
        res.status(201).json(drawing);
    }, function(err) {
        res.status(400).json(err);
    });
});



module.exports = router;