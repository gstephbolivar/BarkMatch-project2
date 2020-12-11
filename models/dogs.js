module.exports = function (sequelize, DataTypes) {
  const Dogs = sequelize.define("Dogs", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isNumeric: true },
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    energy_level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { isAlpha: true },
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isNumeric: true },
    },
  });
  Dogs.associate = function (models) {
    Dogs.belongsTo(models.Volunteer);
  };
  return Dogs;
};
