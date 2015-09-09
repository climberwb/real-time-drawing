var Drawing = require('../models/drawing');
var _ = require('lodash');

exports.save = function(name, callback, errback) {
    console.log('inside save',name);
    Drawing.create({ name: name }, function(err, drawing) {
        if (err) {
            errback(err);
            return;
        }
        callback(drawing);
        
    });
};

exports.findOne = function(id, callback, errback) {
    Drawing.findOne({ _id: id}, function (err, doc){
        if (err) {
            errback(err);
            return;
        }
        callback(doc);
    });
};

exports.list = function(callback, errback) {
    Drawing.find(function(err, drawings) {
        if (err) {
            errback(err);
            return;
        }
        var newDrawings = _.map(drawings, function(drawing) { return {_id:drawing._id, name: drawing.name}; });
        return callback(newDrawings);
    });
};

exports.update = function(id,point,callback,errback){
    console.log('inside services update'+' '+point+' '+id);
    Drawing.findOneAndUpdate({_id:id},{$push: {points: point}},{safe: true, upsert: true},function(err,drawing){
      //console.log(err);
        if(err){
             console.log('inside services update fail');
             errback(err);
            // errback(err);
             return;
        }
         console.log('inside services update success');
        callback(drawing);
    });
}

// exports.destroy = function(id,callback,errback){
//     console.log('inside services destroy',id);
//     Item.findOneAndRemove({_id:id}, function(err,item){
//       //console.log(err);
//         if(err){
//              console.log('inside services destroy fail');
//             console.log(errback(err));
//             // errback(err);
//             return;
//         }
//          console.log('inside services destroy success');
//         callback(item);
//     });
// }