var express = require("express");
var router = express.Router();
var Employee = require("../models/employee");
var Asset = require("../models/asset");
var moment = require('moment');

router.get("/", function(req, res){
  Employee.find({}, function(err, allUsers){
    if(err){
      console.log(err);
    } else {
      res.render("employees/index", {users: allUsers});
    }
  });
});

router.post("/", function(req, res){
  //new user creation
  var firstname = req.body.firstName,
      lastname = req.body.lastName,
      username = firstname+lastname,
      email = req.body.email,
      department = req.body.userDepartment;
      startDate = req.body.startDate;
  console.log(startDate);
  var newUser ={
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    department: department,
    startdate: startDate};
  Employee.create(newUser, function(err, newlyCreated){
    if(err){
      req.flash("error", 'User mostlikely already exists.')
      res.redirect('/employees/new')
      console.log(err);
    }else{
      //department and location
      Asset.findOneAndUpdate({assetDepartment:department, assetType:'computer', assetStatus:'Ready'},{assignee:username, assetStatus:'In Use'}, function(err, foundAsset){
        if(err){
          console.log(err)
          //possible no asset
        }else{
          if(foundAsset === null){
            req.flash("error", 'There are no available Assets!')
            res.redirect('/employees/'+newlyCreated._id)
          }else{
            console.log(typeof foundAsset)
            req.flash("success", 'User '+newlyCreated.firstname+' added and asset #'+foundAsset.assetID+' has been assigned');
            console.log(newlyCreated);
            res.redirect("/employees");
          }



        }
      })
      // after user is added to the database we need to assign an available asset

      //query the asset model to check if ther is an available asset otherwise email to admin


    }
  });
});

router.get("/new", function(req, res){
  res.render("employees/new");
});

router.get("/:id", function(req, res){
  Employee.findById(req.params.id, function(err,user){
    if(err){
      console.log(err);
    } else{
      console.log(user)
      Asset.find({assignee:user.username}, function(err, assets){
        if(err){
          console.log(err);
        } else{
          res.render("employees/view", {user:user, assets:assets, moment:moment})
        }
      });
    }
  })
});

module.exports=router;
