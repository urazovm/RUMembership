module.exports = function(sequelize, DataTypes){
    var TrainingSession = sequelize.define('TrainingSession', {
       date: {
           type: DataTypes.DATEONLY,
           unique: true,
           allowNull: false
       }, 
       extraInfo: {
           type: DataTypes.TEXT,
           allowNull: true
       } 
    }, {
         classMethods: {
          associate: function(models){
              models.Player.belongsToMany(TrainingSession, {through: 'PlayerAtSessions'});
          }  
        }
    });
    return TrainingSession;
}