module.exports = function (sequelize, DataTypes) {

    var notAlphaMsg = " cannot have non letter characters";
    var notEmptyMsg = " cannot be empty";
    var invalidGenderMsg = " must be 'Male' or 'Female' according to WFDF/IOC definitions";
    var notEmailMsg = " must be a valid email address";
    var nonUniquePlayerMsg = "Someone with that name, surname and nickname already exists"

    var Player = sequelize.define('Player', {
        //uniqueness doesn't work! Makes all 3 unique, rather than 3 combining into one unique thing...
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: {
            //     args: 'uniqueName',
            //     msg: nonUniquePlayerMsg
            // },
            validate: {
                isAlpha: {
                    msg: 'firstName' + notAlphaMsg
                },
                notEmpty: {
                    msg: 'firstName' + notEmptyMsg
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: {
            //     args: 'uniqueName',
            //     msg: nonUniquePlayerMsg
            // },
            validate: {
                isAlpha: {
                    msg: 'lastName' + notAlphaMsg
                },
                notEmpty: {
                    msg: 'lastName' + notEmptyMsg
                }
            }
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: true,
            get: function () {
                if (!this.getDataValue('nickName')) {
                    return "";
                }
                return this.getDataValue('nickName');
            }
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['Male', 'Female']],
                    msg: 'gender' + invalidGenderMsg
                }
            }
        },
        student: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'emailAddress' + notEmailMsg
                }
            }
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
        area: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: '^[\\a-zA-Z\\ \\-]*$',
                    msg: 'areaNotValid'
                },
                notEmpty: {
                    msg: 'area' + notEmptyMsg
                }
            }
        },
        postCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //TODO: Add format validator
                notEmpty: {
                    msg: 'postCode' + notEmptyMsg
                }
            }
        },
        ukuName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: {
                    msg: 'ukuName' + notAlphaMsg
                },
                notEmpty: {
                    msg: 'ukuName' + notEmptyMsg
                }
            }
        },
        wfdfID: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: {
                    msg: 'wfdfID' + notAlphaMsg
                },
                notEmpty: {
                    msg: 'wfdfID' + notEmptyMsg
                }
            }
        },
        medicalInfo: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: 'medicalInfo' + notEmptyMsg
                }
            }
        }
    }, {
            indexes: [{
                unique: true,
                fields: ['firstName', 'nickName', 'lastName'],
            }],
            getterMethods: {
                casualName: function () {
                    if (this.nickName && this.nickName !== '') {
                        return this.nickName;
                    }
                    return this.firstName;
                },
                fullName: function () {
                    return this.firstName + ' ' + this.lastName;
                },
                fullNameWithNick: function () {
                    if (this.nickName) {
                        return this.firstName + ' "' + this.nickName + '" ' + this.lastName;
                    }
                    return this.fullName;
                },
                uniqueName: function () {
                    return this.firstName + this.nickName + this.lastName;
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