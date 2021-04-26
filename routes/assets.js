var express = require("express");
var router = express.Router();
var Asset = require("../models/asset");
var Employee = require("../models/employee");

//asset index
router.get("/", function(req, res){
  Asset.find({}, function(err, allAssets){
    if(err){
      console.log(err);
    } else {
      console.log(allAssets);
      res.render("assets/show", {assets: allAssets})
    }
  })
});

router.post("/", function(req, res){
    var assetType = req.body.assetType;
    var assetID =req.body.assetID;
    var assetSerial =req.body.assetSerial;
    var assetVendor = req.body.assetVendor;
    var assetModel = req.body.assetModel;
    var assetLocation = req.body.assetLocation;
    var assetStatus = req.body.assetStatus;
    var assetDepartment = req.body.assetDepartment;
    var newAsset = {
      assetType: assetType,
      assetID: assetID,
      assetSerial: assetSerial,
      assetVendor: assetVendor,
      assetModel: assetModel,
      assetLocation: assetLocation,
      assetStatus: assetStatus,
      assetDepartment: assetDepartment};
    Asset.create(newAsset, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/assets"+"/"+assetID);
        }
    });
});

router.get("/new", function(req, res){
  res.render("assets/new");
});

router.get("/computer", function(req, res){
  Asset.find({assetType: 'computer'}, function(err, allAssets){
    if(err){
      console.log(err);
    } else {
      res.render("assets/index", {assetType:'Computer', assets: allAssets})
    }
  })
});

router.get("/mobile", function(req, res){
  Asset.find({assetType: 'mobile'}, function(err, allAssets){
    if(err){
      console.log(err);
    } else {
      res.render("assets/index", {assetType:'Mobile', assets: allAssets})
    }
  })
});

router.get("/assign/:id", function(req, res){
  Asset.find({assetID:req.params.id},function(err, foundAsset){
    if(err){
      console.log(err);
  } else {
    Employee.find({},function(err, allUsers){
    if(err){
      console.log(err);
  } else {
            console.log(foundAsset);
            res.render("assets/assign", {asset:foundAsset, users:allUsers});
        }
    });}
  });
})

router.get("/:id", function(req, res){
  Asset.find({assetID:req.params.id},function(err, foundAsset){
    if(err){
      console.log(err);
  } else {
            res.render("assets/view", {asset:foundAsset});
        }
    });
});

router.post("/:id/assign", function (req, res){
  console.log(req.body);
   Asset.findOneAndUpdate({assetID:req.params.id}, {assetStatus:'In Use', assignee:req.body.assignee}, function(err, asset) {
       if(err){
           console.log(err);
           res.redirect("/assets");
       } else {
                  req.flash("success", 'Asset is assigned to '+req.body.assignee);
                  res.redirect("/assets/");
              }
          })
});
router.get("/:id/return", function (req, res){
  console.log(req.body);
   Asset.findOneAndUpdate({assetID:req.params.id}, {assetStatus:'Not Ready', assignee:{}}, function(err, asset) {
       if(err){
           console.log(err);
           res.redirect("/assets");
       } else {
                  req.flash("success", 'Asset is back in stock')
                  res.redirect("/assets/");
              }
          })
});
router.get("/:id/ready", function (req, res){
  console.log(req.body);
   Asset.findOneAndUpdate({assetID:req.params.id}, {assetStatus:'Ready'}, function(err, asset) {
       if(err){
           console.log(err);
           res.redirect("/assets");
       } else {
                  console.log(asset);
                  req.flash("success", 'Asset is marked as Ready for Use')
                  res.redirect("/assets/");
              }
          })
});
module.exports=router;
