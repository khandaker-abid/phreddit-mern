// Comment Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
    {
        content:{type: String, required: true, maxLength: 500},
        commentIDs:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
        commentedBy:{type: String, required: true},
        commentedDate:{type: Date, required: true, default: new Date()}
    }
);

CommentSchema
.virtual('url')
.get(function () {
    return 'comments/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
