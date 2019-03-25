import Sequelize from 'sequelize';
import { SequelizeAttributes } from '../database/typings';

interface IClientAttributes {
    id?: string;
    name: string;
    api_key: string;
    api_secret: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

type ClientInstace = Sequelize.Instance<IClientAttributes> & IClientAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<IClientAttributes> = {
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
    };

    return sequelize.define<ClientInstace, IClientAttributes>('api_clients', attributes);
};