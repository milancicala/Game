import Sequelize from 'sequelize';
import ActvityLogFactory from './ActivityLog';
import IPWhitelistFactory from './IPWhitelist';
import ClientFactory from './Client';

// requires
const config = require('../config/config.json');

const sequelize = new Sequelize.Sequelize(
    process.env.PGUSER || config.development.database,
    process.env.PGUSER || config.development.username,
    process.env.PGPASSWORD || config.development.password,
     config.development,
);

const database = {
    sequelize,
    Sequelize,
    ActivityLog: ActvityLogFactory(sequelize),
    IPWhitelist: IPWhitelistFactory(sequelize),
    Client: ClientFactory(sequelize),
};

Object.keys(database).forEach((model: any) => {
    if (model.associate) {
        model.associate(database);
    }
});

export default database;