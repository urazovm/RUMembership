var models = require('../models');
var UserRole = models.UserRole;
var Player = models.Player;

requiredVariable = function (variable, varName, missing) {
  if (typeof variable == 'undefined') {
    missing.push(varName);
  }
  return missing;
}

checkObject = function (obj, created) {
  if (created) {
    console.log(obj.name + " made anew");
  }
  if (obj) {
    console.log(obj.name + ' exists: ' + JSON.stringify(obj));
  }
  else {
    console.log('Nothing created!');
  }
}

fOCPlayer = function (player) {
  Player.findOrCreate({
    where: {
      firstName: player.firstName,
      nickName: player.nickName,
      lastName: player.lastName,
      dob: player.dob,
      gender: player.gender,
      student: player.student,
      emailAddress: player.emailAddress,
      contactNumber: player.contactNumber,
      area: player.area,
      postCode: player.postCode
    }
  }).spread(function (player, created) {
    if (created) {
      console.log(player.fullNameWithNick + " made anew");
    }
    if (player) {
      console.log(player.fullNameWithNick + ' exists: ' + JSON.stringify(player));
    }
    else {
      console.log('Nothing created!');
    }
  });
}

addDefaultValues = function () {

  var roles = ["Admin", "GlobalAdmin", "Chairman", "Secretary", "Captain", "SpiritOfficer"];

  for (var i = 0; i < roles.length; i++) {
    UserRole.findOrCreate({
      where: {
        name: roles[i]
      }
    }).spread(checkObject);
  }

  var teamRoles = ["Captain", "ViceCaptain", "SpiritCaptain"];

  for (var i = 0; i < teamRoles.length; i++) {
    models.TeamRole.findOrCreate({
      where: {
        name: teamRoles[i]
      }
    }).spread(checkObject);
  }

  var player = {
    firstName: "Daniel",
    nickName: "Dan",
    lastName: "Godbold",
    id: "1",
    dob: "01/01/1970",
    gender: "Male",
    student: "false",
    emailAddress: "test@fake.com",
    contactNumber: "07285176294",
    area: "Small Town",
    postCode: "TT15 8TT"
  };
  var player2 = Player.build({
    firstName: "Tereza",
    nickName: "Tree",
    lastName: "Menclova",
    id: "2",
    dob: "01/01/1970",
    gender: "Female",
    student: "false",
    emailAddress: "test@fake.com",
    contactNumber: "07285176294",
    area: "Small Town",
    postCode: "TT15 8TT"
  });
  var player3 = Player.build({
    firstName: "Ania",
    nickName: "",
    lastName: "Godbold",
    id: "3",
    dob: "01/01/1970",
    gender: "Female",
    student: "false",
    emailAddress: "test@fake.com",
    contactNumber: "07285176294",
    area: "Small Town",
    postCode: "TT15 8TT"
  });
  fOCPlayer(player);
  fOCPlayer(player2);
  fOCPlayer(player3);

}

module.exports = {
  requiredVariable,
  addDefaultValues
}