// Volunteer table for db
module.exports = function (sequelize, DataTypes) {
  const Volunteer = sequelize.define("Volunteer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
  });

  Volunteer.associate = (models) => {
    Volunteer.hasMany(models.Dogs);
  };

  return Volunteer;
};
