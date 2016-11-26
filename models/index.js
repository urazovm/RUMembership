if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize');
    var sequelize = null;


    //postgres://jhjuwubwlcfpcn:3yCcNJh33wJTPHMwBMyQ5ug5Qp@ec2-54-235-102-235.compute-1.amazonaws.com:5432/ddhvk755r9963m
    var dbConnectionString = process.env.DATABASE_URL;
    if (!process.env.DATABASE_URL) {
        dbConnectionString = "postgres://postgres:Password1@localhost:5432/ruDev";
    }

    sequelize = new Sequelize(dbConnectionString, {
        dialect: 'postgres',
        protocol: 'postgres'
    });

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize//,
        //User: sequelize.import(__dirname + '/user')
    }

    //define associations here
}

module.exports = global.db;