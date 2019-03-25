import Sequelize from 'sequelize';
import { SequelizeAttributes } from '../database/typings';

interface IActivityLogAttributes {
    id?: string;
    user_id: string;
    description: string;
    method: string;
    route: string;
    data: object;
    ip_address: string;
    code: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

type ActivityLogInstace = Sequelize.Instance<IActivityLogAttributes> & IActivityLogAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<IActivityLogAttributes> = {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
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
            validate: { len: [1, 6] },
        },
        route: { type: Sequelize.STRING(192),
            allowNull: false,
            validate: { len: [1, 192] },
        },
        data: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        ip_address: {
            type: Sequelize.STRING(32),
            allowNull: true, validate:
                { len: [1, 32] },
        },
        code: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    };

    return sequelize.define<ActivityLogInstace, IActivityLogAttributes>('activity_logs', attributes);
};