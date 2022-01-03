var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var { Schema } = mongoose;
var userSchema = new Schema({  
    fullName: { type: String, required: true, minlength: 2, maxlength: 30 },
    clinics: { type: String, required: true, minlength: 2, maxlength: 30 },
    password: { type: String, required: true, minlength: 6, maxlength: 30 },
    user_id: { type: String, required: true, minlength: 6, maxlength:  30},
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 60,
    },
    role: { type: String, required: true, default:"user"},
    createdAt: { type: Date, default: Date.now },
});
userSchema.method('GenerateAuthToken', function () {
    const token = jwt.sign(
      { _id: this._id, role: this.role },
      'token'
    );
    return token;
  });
const User = mongoose.model('User', userSchema);
module.exports = { User,  };