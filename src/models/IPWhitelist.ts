import Sequelize from 'sequelize';
import { SequelizeAttributes } from '../database/typings';

interface IIPWhitelistAttributes {
    id?: string;
    ip_address: string;
    client_id: string;
    type: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

type IPWhitelistInstace = Sequelize.Instance<IIPWhitelistAttributes> & IIPWhitelistAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<IIPWhitelistAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
    };

    return sequelize.define<IPWhitelistInstace, IIPWhitelistAttributes>('api_ips_whitelist', attributes);
};