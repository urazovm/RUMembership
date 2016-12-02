module.exports = function(sequelize, DataTypes) {
    var TeamRole = sequelize.define('TeamRole', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return TeamRole;
}