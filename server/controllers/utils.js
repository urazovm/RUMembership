var models = require('../models');
var UserRole = models.UserRole;

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
}

module.exports = {
  requiredVariable,
  addDefaultValues
}