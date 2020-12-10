module.exports = function (sequelize, DataTypes) {
    const Dog = sequelize.define("Dog", {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      breed: DataTypes.STRING,
      gender: DataTypes.STRING,
      size: DataTypes.STRING,
      energy_level: DataTypes.STRING,
      bio: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      img_path: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    });
  
    
  };