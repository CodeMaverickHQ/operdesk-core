var mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   username: {
              type: String,
              unique: true},
   email: String,
   department: String,
   startdate: Date,
   asset: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
