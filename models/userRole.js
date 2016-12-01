module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define('UserRole', {
        //level: DataTypes.INTEGER,
        name: DataTypes.STRING
    });
    return UserRole;
}