var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        encryptedPassword: DataTypes.STRING,
        profilePicture: DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.UserRole);
                    User.belongsTo(models.Player);
                },
                generateHash: function (password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                }
            }, instanceMethods: {
                verifyPassword: function (password) {
                    return bcrypt.compareSync(password, this.encryptedPassword);
                }
            }
        });

    return User;
}