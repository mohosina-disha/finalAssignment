const sequelize = require('../config');
const User = require('./user');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = { User };
