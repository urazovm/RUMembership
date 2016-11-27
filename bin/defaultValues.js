var models = require('../models');
var UserRole = models.UserRole;

module.exports = function () {

    var roles = ["Admin", "GlobalAdmin", "Chairman", "Secretary", "Captain", "SpiritOfficer"];

    for (var i = 0; i < roles.length; i++) {
        UserRole.findOrCreate({
            where: {
                name: roles[i]
            }
        }).spread(function (userRole, created) {
            if (created) {
                console.log(userRole.name + " made anew");
            }
            if (userRole) {
                console.log(userRole.name + ' created: ' + JSON.stringify(userRole));
            }
            else {
                console.log('No userRole?');
            }
        });
    }
}
