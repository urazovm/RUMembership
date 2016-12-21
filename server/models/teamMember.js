module.exports = function(sequelize, DataTypes) {
    var TeamMember = sequelize.define('TeamMember', {
        extraInfo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            classMethods: {
                associate: function(models) {
                    TeamMember.hasOne(models.TeamRole);
                    TeamMember.hasOne(models.Team);
                    TeamMember.hasOne(models.Player);
                }
            }
        });
    return TeamMember;
}