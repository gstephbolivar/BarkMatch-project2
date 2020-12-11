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
      type: DataTypes.INTEGER(12),
      allowNull: false,
    },
  });

  return Volunteer;
};
