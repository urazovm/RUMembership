module.exports = function (sequelize, DataTypes) {
    var EmergencyContact = sequelize.define('EmergencyContact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'contactNumber must be a number'
                }
            }
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return EmergencyContact;
}