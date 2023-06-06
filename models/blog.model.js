const {Sequelize, DataTypes} = require("sequelize");
require("dotenv").config()
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


const Blog = sequelize.define("blog", {
   title: {
     type: DataTypes.STRING,
     allowNull: false
   },
   author: {
     type: DataTypes.STRING,
     allowNull: false
   },
   content: {
     type: DataTypes.STRING,
   },
});


module.exports = Blog

sequelize.sync().then(() => {
    console.log('Blog table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });