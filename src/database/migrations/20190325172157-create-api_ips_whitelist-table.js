'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('api_ips_whitelist', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },

            ip_address: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },

            client_id : {
                type: Sequelize.UUID,
                allowNull: true,
            },

            type: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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

        return queryInterface.dropTable('api_ips_whitelist');
    }
};
