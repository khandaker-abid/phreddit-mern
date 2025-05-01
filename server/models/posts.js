// Post Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        title:{type: String, required: true, maxLength:100},
        content:{type: String, required: true},
        linkFlairID:{type: Schema.Types.ObjectId, ref: 'LinkFlair'},
        postedBy:{type: String, required: true},
        postedDate:{type: Date, required: true, default: new Date()},
        commentIDs:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
        views:{type:Number, default:0}
    }
);

PostSchema
.virtual('url')
.get(function () {
    return 'posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);