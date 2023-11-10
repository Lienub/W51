'use strict';

module.exports = (sequelize, DataTypes) => {
  const Coefficient = sequelize.define(
    'Coefficient',
    {
      valeur: DataTypes.INTEGER
    }
  );

  Coefficient.associate = (db) => {

  };

  return Coefficient;
};
