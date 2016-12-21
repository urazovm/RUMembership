var models = require('../models');
var UserRole = models.UserRole;

function checkObject(obj, created) {
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

module.exports = function () {

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
