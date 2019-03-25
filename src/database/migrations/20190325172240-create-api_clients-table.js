'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('api_clients', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            api_key: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            api_secret: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },

            deleted_at: {
                type: Sequelize.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('api_clients');
    }
};
