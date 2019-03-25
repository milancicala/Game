'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('activity_logs', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },

            user_id: {
                type: Sequelize.UUID,
                allowNull: true,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            method: {
                type: Sequelize.STRING(6),
                allowNull: false,
            },

            route: {
                type: Sequelize.STRING(192),
                allowNull: false,
            },

            data: {
                type: Sequelize.JSON,
                allowNull: true,
            },

            ip_address: {
                type: Sequelize.STRING(32),
                allowNull: true,
            },

            code: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('activity_logs');
    }
};
