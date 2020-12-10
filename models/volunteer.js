module.exports = function (sequelize, DataTypes) {
    const Volunteer = sequelize.define("Volunteer", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
    });

    return Volunteer;
};