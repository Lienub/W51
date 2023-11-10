'use strict';

module.exports = (sequelize, DataTypes) => {
  const UE = sequelize.define(
    'UE',
    {
      intitule_court: DataTypes.STRING,
      intitule: DataTypes.STRING
    }
  );

  UE.associate = (db) => {
    UE.belongsTo(db.Semestre);
    UE.belongsToMany(db.Ressource, { through: db.Coefficient });
  };

  return UE;
};
