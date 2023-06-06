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


const Comment = sequelize.define("comment", {
   comment: {
     type: DataTypes.STRING,
     allowNull: false
   },
   blog: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   author: {
    type: DataTypes.STRING,
    allowNull: false
   },
});

module.exports = Comment


sequelize.sync().then(() => {
    console.log('Comment table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });