var express = require('express');
var models = require('../models');
var router = express.Router();

function reqVariable(variable, varName, missing) {
  if (!variable) {
    missing.push(varName);
  }
  return missing;
}

router.route('/')
  /* GET users listing. */
  .get(function (req, res, next) {
    models.Player.findAll()
      .then(function (players) {
        res.send(JSON.stringify(players));
      });
    //res.send('respond with a resource');
  })
  .post(function (req, res, next) {
    if (!req.body) {
      res.send("Please send some JSON");
    }
    else {
      let missing = [];
      console.log(missing);
      let firstName = req.body.firstName;
      missing = reqVariable(firstName, "firstName", missing);
      let nickName = req.body.nickName;
      console.log(missing);
      let surName = req.body.surName;
      missing = reqVariable(surName, "surName", missing);
      let dob = req.body.dob;
      missing = reqVariable(dob, "dob", missing);
      let gender = req.body.gender;
      missing = reqVariable(gender, "gender", missing);
      let student = req.body.student;
      missing = reqVariable(student, "student", missing);
      let emailAddress = req.body.emailAddress;
      missing = reqVariable(emailAddress, "emailAddress", missing);
      let contactNumber = req.body.contactNumber;
      missing = reqVariable(contactNumber, "contactNumber", missing);
      let area = req.body.area;
      missing = reqVariable(area, "area", missing);
      let postCode = req.body.postCode;
      missing = reqVariable(postCode, "postCode", missing);
      let ukuName = req.body.ukuName;
      let wfdfID = req.body.wfdfID;
      let medicalInfo = req.body.medicalInfo;
      let emergencyContactName = req.body.emergencyContactName;
      missing = reqVariable(emergencyContactName, "emergencyContactName", missing);
      let emergencyContactNumber = req.body.emergencyContactNumber;
      missing = reqVariable(emergencyContactNumber, "emergencyContactNumber", missing);
      let emergencyContactRelationship = req.body.emergencyContactRelationship;
      missing = reqVariable(emergencyContactRelationship, "emergencyContactRelationship", missing);

      if (missing.length > 0) {
        return res.send('Missing values for: ' + missing);
      }

      var player = models.Player.build({
        firstName: firstName,
        lastName: surName,
        nickName: nickName,
        dob: dob,
        gender: gender,
        student: student,
        emailAddress: emailAddress,
        contactNumber: contactNumber,
        area: area,
        postCode: postCode,
        ukuName: ukuName,
        wfdfID: wfdfID,
        medicalInfo: medicalInfo
      });

      console.log(player.uniqueName);

      console.log(JSON.stringify(player));
      player.save().then(function () {
        res.send("Saved player " + player.fullNameWithNick + " this unique name " + player.uniqueName);
      }).catch(function (error) {
        //oops
        console.log(error);
        res.send(error);
      })
    }
  });

module.exports = router;
