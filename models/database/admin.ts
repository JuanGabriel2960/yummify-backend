import { DataTypes } from 'sequelize';
import db from '../../database/connection';

const Admin = db.define<any>('admin', {
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
    role: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

export default Admin;
