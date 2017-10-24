let mongoose = require('mongoose');

let workSchema = mongoose.Schema({
 firstName: String,
 lastName: String,
 userid: String,
 username: String,
 address :String,
 number:String,
 area :String,
 work: String,
 zip:  String,
 email:  String,
 msex :String,
 fsex:String,
 desc:String
});

let Work = module.exports = mongoose.model('Work',workSchema);
