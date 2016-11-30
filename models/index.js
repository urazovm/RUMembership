if (!global.hasOwnProperty('db')) {
    var fs = require('fs');
    var path = require('path');
    var Sequelize = require('sequelize');
    var sequelize = null;


    //postgres://jhjuwubwlcfpcn:3yCcNJh33wJTPHMwBMyQ5ug5Qp@ec2-54-235-102-235.compute-1.amazonaws.com:5432/ddhvk755r9963m
    var dbConnectionString = process.env.DATABASE_URL;
    if (!process.env.DATABASE_URL) {
        dbConnectionString = "postgres://postgres:Password1@localhost:5432/ruDev";
    }

    sequelize = new Sequelize(dbConnectionString, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: ''
    });

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }

    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(function (modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });
}

module.exports = global.db;