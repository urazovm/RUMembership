module.exports = function (sequelize, DataTypes) {
    var TrainingGroup = sequelize.define('TrainingGroup', {
        groupName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        pricePerSession: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentPricePerSession: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        blockPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentBlockPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            classMethods: {
                associate: function (models) {
                    TrainingGroup.hasMany(models.TrainingSession);
                }
            }
        });

    return TrainingGroup;
}