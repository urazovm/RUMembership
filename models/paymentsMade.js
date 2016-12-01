module.exports = function (sequelize, DataTypes) {
    var Payment = sequelize.define('Payment', {
        amount: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        datePaid: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        isHistorical: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hasReciept: {
            type: DataTypes.BOOLEAN,
            comment: 'Needed for repayment',
            allowNull: true
        },
        extraInfo: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Payment;
}