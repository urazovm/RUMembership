module.exports = function (sequelize, DataTypes) {
    var Team = sequelize.define('Team', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        division: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            classMethods: {
                associate: function (models) {
                    Team.hasOne(models.Tournament);
                    Team.hasMany(models.SpiritScore);
                }
            }
        });
    return Team;
}