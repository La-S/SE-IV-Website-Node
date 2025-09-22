const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define(
        'Course',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            department: {
                type: DataTypes.CHAR(4),
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING(12),
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            hours: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(2048)
            }
        }
    )
}