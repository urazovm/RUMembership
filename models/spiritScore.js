module.exports = function (sequelize, DataTypes) {
    var SpiritScore = sequelize.define('SpiritScore', {
        opposition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rulesKnowledgeAndUse: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 0,
                max: 4
            }
        },
        foulsAndBodyContact: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 0,
                max: 4
            }
        },
        fairMindedness: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 0,
                max: 4
            }
        },
        positiveAttitudeAndSelfControl: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 0,
                max: 4
            }
        },
        communication: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validation: {
                min: 0,
                max: 4
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
            //do a total getter out of 20
            getterMethods: {
                average: function () {
                    return (this.rulesKnowledgeAndUse + this.foulsAndBodyContact + this.fairMindedness + this.positiveAttitudeAndSelfControl + this.communication) / 5;
                }
            }
        });
    return SpiritScore;
}