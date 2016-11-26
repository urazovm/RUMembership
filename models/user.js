module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        encryptedPassword: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.UserRole);
                    User.belongsTo(models.Player);
                }
            }
        });

    return User;
}