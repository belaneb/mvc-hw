const dotenv = require('dotenv')
dotenv.config()
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    process.env.DBNAME, process.env.DBUSER, process.env.DBPASS,
    {
        host: process.env.DBHOST,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


const User = sequelize.define("user", {
   username: {
     type: DataTypes.STRING,
     allowNull: false
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false,
   },
});

module.exports = User


sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });