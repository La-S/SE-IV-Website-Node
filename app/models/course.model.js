module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define(
        'Course',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            department: {
                type: Sequelize.CHAR(4),
                allowNull: false,
            },
            number: {
                type: Sequelize.STRING(12),
                allowNull: false,
            },
            level: {
                type: Sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 0,
            },
            hours: {
                type: Sequelize.CHAR(1),
                allowNull: false,
                defaultValue: 0,
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(2048)
            }
        }
    )
    return Course;
}