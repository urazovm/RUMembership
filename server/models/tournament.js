module.exports = function (sequelize, DataTypes) {
    var Tournament = sequelize.define('Tournament', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        flatFeePerDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1000//pence!
        },
        discountFlatFeePerDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 750//pence
        }
    });
    return Tournament;
}