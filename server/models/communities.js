// Community Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommunitySchema = new Schema(
    {
        name:{type: String, required: true, maxLength:100},
        description:{type: String, required: true, maxLength:500},
        postIDs:[{type: Schema.Types.ObjectId, ref: 'Post'}],
        startDate:{type: Date, required: true, default: new Date()},
        members:[{type:String, required:true}]
    }
);

CommunitySchema
.virtual('memberCount')
.get(function () {
    return this.members.length
});

CommunitySchema
.virtual('url')
.get(function () {
    return 'communities/' + this._id;
});

module.exports = mongoose.model('Community', CommunitySchema);