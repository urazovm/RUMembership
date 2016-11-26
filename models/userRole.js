module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define('UserRole', {
        //level: DataTypes.INTEGER,
        name: DataTypes.STRING
    });

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

    return UserRole;
}