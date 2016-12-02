module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define('UserRole', {
        //level: DataTypes.INTEGER,
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return UserRole;
}