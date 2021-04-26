var express = require("express");
var router = express.Router();
var Asset =require("../models/asset")

router.get("/", function(req,res){
  Asset.find({}, function(err, assets){
    if(err){
      res.redirect('/')
    } else{
          function isComputer(pc) {
              return pc.assetType == 'computer' && pc.assetStatus=='Ready';
            };
          function isMobile(mobile) {
            return mobile.assetType=='mobile' && mobile.assetStatus=='Ready';
          };
          function usedComputer(pc){
            return pc.assetType == 'computer' && pc.assetStatus=='In Use';
          }
          function noComputer(pc){
            return pc.assetType == 'computer' && pc.assetStatus=='Not Ready';
          }
          function allComputer(pc){
            return pc.assetType == 'computer';
          }
          var allAssets = Object.keys(assets).length
          var allComputerCount = Object.keys(assets.filter(allComputer)).length
          var noComputerCount = Math.round(Object.keys(assets.filter(noComputer)).length / allComputerCount * 100);
          var usedComputerCount = Math.round(Object.keys(assets.filter(usedComputer)).length / allComputerCount * 100);
          var computerCount = Math.round(Object.keys(assets.filter(isComputer)).length / allComputerCount * 100);

          var mobileCount = Object.keys(assets.filter(isMobile)).length;

        res.render("index", {computerCount:computerCount, mobileCount:mobileCount, allAssets:allAssets, usedComputerCount:usedComputerCount, noComputerCount:noComputerCount});
    }
  })

});

module.exports = router;
