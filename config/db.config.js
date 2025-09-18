module.exports = {
    HOST: 'localhost',
    USER: 't32025',
    PASSWORD: 'CS@oc2025t3',
    DB: 'course-t3',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};