module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define('Player', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        nickName: DataTypes.STRING,
        //make these alphanumeric
        dob: DataTypes.DATE,
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['Male', 'Female']],
                    msg: "Must be 'Male' or 'Female' according to WFDF/IOC definitions"
                }
            }
        },
        student: DataTypes.BOOLEAN,
        emailAddress: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        contactNumber: DataTypes.INTEGER,
        area: DataTypes.STRING,
        postCode: DataTypes.STRING,
        ukuName: DataTypes.STRING,
        wfdfID: DataTypes.INTEGER,
        medicalInfo: DataTypes.TEXT
    }, {
            getterMethods: {
                fullName: function () {
                    return this.firstName + ' ' + this.lastName;
                },
                fullNameWithNick: function () {
                    return this.firstName + ' "' + this.nickName + '" ' + this.lastName;
                }
            },
            classMethods: {
                associate: function (models) {
                    Player.hasMany(models.EmergencyContact);
                }
            }
        });
    return Player;
}