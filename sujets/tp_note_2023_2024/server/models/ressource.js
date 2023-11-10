'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ressource = sequelize.define(
    'Ressource',
    {
      nom: DataTypes.STRING,
      hcm: DataTypes.INTEGER,
      htd: DataTypes.INTEGER,
      htp: DataTypes.INTEGER
    }
  );

  Ressource.associate = (db) => {
    Ressource.belongsTo(db.Semestre);
    Ressource.belongsToMany(db.UE, { through: db.Coefficient });
  };

  return Ressource;
};
