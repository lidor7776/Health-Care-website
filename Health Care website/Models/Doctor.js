const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const doctorSchema = new Schema({  
    fullName: { type: String, required: true, minlength: 2, maxlength: 30 },
    fieldOfPractice: { type: String, required: true, minlength: 2, maxlength: 30 },
    activityDaysAndHours: { type: String, required: true, minlength: 6, maxlength: 100 },
    doctorID: { type: String, required: true, minlength: 6, maxlength:  30},
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 60,
    },
    location1: { type: String, required: true, minlength: 2, maxlength: 30 },
    shortDescription: { type: String, required: true, minlength: 6, maxlength: 30 },
    pass: { type: String, required: true, minlength: 6, maxlength: 30 },
    role: { type: String, required: true, default:"doctor"},
    createdAt: { type: Date, default: Date.now },
});
doctorSchema.method('GenerateAuthToken', function () {
    const token = jwt.sign(
      { _id: this._id, role: this.role },
      'token'
    );
    return token;
  });
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = { Doctor,  };