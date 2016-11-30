module.exports = function (sequelize, DataTypes) {

    var notAlphaMsg = "Cannot have non letter characters";
    var notEmptyMsg = "Cannot be empty";
    var invalidGenderMsg = "Must be 'Male' or 'Female' according to WFDF/IOC definitions";
    var notEmailMsg = "Must be a valid email address";
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
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
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
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: true,
            // unique: {
            //     args: 'uniqueName',
            //     msg: nonUniquePlayerMsg
            // },
            validate: {
                isAlpha: {
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        // uniqueName: {
        //     type: DataTypes.VIRTUAL,
        //     unique: {
        //         msg: nonUniquePlayerMsg
        //     },
        //     get: function () {
        //         return this.firstName + this.nickName + this.lastName;
        //         // this.setDataValue('uniqueName', val);
        //         //this.setDataValue('uniqueName', this.firstName + this.nickName + this.lastName);
        //     }
        // },
        //make these alphanumeric
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
                    msg: invalidGenderMsg
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
                    msg: notEmailMsg
                }
            }
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        postCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //TODO: Add format validator
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        ukuName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: {
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        wfdfID: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isAlpha: {
                    msg: notAlphaMsg
                },
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        },
        medicalInfo: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: notEmptyMsg
                }
            }
        }
    }, {
            indexes: [{
                unique: true,
                fields: ['firstName', 'nickName', 'lastName']
            }],
            getterMethods: {
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