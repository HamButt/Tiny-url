'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Urls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Urls.belongsTo(models.Users,{
        as:"",
        foreignKey: "userId"
      })
      
    }
  }
  Urls.init({
    longUrl: DataTypes.TEXT,
    shortUrl: DataTypes.STRING,
    code: DataTypes.TEXT,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Urls',
  });
  return Urls;
};