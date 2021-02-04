"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Currencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Currencies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      e_rate: {
        type: DataTypes.JSON,
      },
      tt_counter: {
        type: DataTypes.JSON,
      },
      bank_notes: {
        type: DataTypes.JSON,
      },
      date: {
        type: DataTypes.STRING(10),
      },
      created_at: {
        type: DataTypes.INTEGER,
      },
      updated_at: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "currencies",
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate(currencies, options) {
          currencies.created_at = moment().unix();
          currencies.updated_at = moment().unix();
        },
        beforeUpdate(currencies, options) {
          currencies.updated_at = moment().unix();
        },
      },
    }
  );

  return Currencies;
};
