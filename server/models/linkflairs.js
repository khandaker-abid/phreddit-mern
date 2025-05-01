// LinkFlair Document Schema
var mongoose = require("mongoose");



var Schema = mongoose.Schema;

var LinkFlairSchema = new Schema(
    {
        content:{type: String, required: true, maxLength: 30}
    }
);

LinkFlairSchema
.virtual('url')
.get(function () {
    return 'linkFlairs/' + this._id;
});

module.exports = mongoose.model('LinkFlair', LinkFlairSchema);