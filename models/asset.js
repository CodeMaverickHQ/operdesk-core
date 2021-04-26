var mongoose = require("mongoose");

var assetSchema = new mongoose.Schema({
   assetType: String,
   assetID: Number,
   assetSerial: String,
   assetModel: String,
   assetVendor: String,
   assetLocation: String,
   assetStatus: String,
   assetDepartment:[String],
   assignee: {
     username:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    username: String
   }
});

module.exports = mongoose.model("Asset", assetSchema);
