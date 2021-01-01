'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Social.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: true,
        },
      })
    }
  };
  Social.init({
    corporation: DataTypes.STRING,
    socialEmail: DataTypes.STRING,
    socialAccount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Social',
  });
  return Social;
};