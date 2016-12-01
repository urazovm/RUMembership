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
                    models.Player.belongsToMany(Team, { through: 'PlayersInTeam' });
                    models.Player.belongsToMany(Team, { through: 'TeamCaptains' });
                    models.Player.belongsToMany(Team, { through: 'TeamSpiritCaptains' });
                    Team.hasOne(models.Tournament);
                }
            }
        });
    return Team;
}