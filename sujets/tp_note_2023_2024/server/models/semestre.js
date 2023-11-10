'use strict';

module.exports = (sequelize, DataTypes) => {
  const Semestre = sequelize.define(
    'Semestre',
    {
      intitule: DataTypes.STRING,
      effectif: DataTypes.INTEGER,
      nbGroupesTD: DataTypes.INTEGER,
      nbGroupesTP: DataTypes.INTEGER
    }
  );

  Semestre.associate = (db) => {
    Semestre.hasMany(db.UE);
    Semestre.hasMany(db.Ressource);
  };

  return Semestre;
};
