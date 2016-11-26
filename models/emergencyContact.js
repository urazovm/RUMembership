module.exports = function (sequelize, DataTypes) {
    var EmergencyContact = sequelize.define('EmergencyContact', {
        name: DataTypes.STRING,
        contactNumber: DataTypes.INTEGER,
        relationship: DataTypes.STRING
    });
    return EmergencyContact;
}