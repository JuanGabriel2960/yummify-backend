import { DataTypes } from 'sequelize';
import db from '../../database/connection';

const Customer = db.define<any>('customer', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    google: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false
})

export default Customer;
