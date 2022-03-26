import { DataTypes } from 'sequelize';
import db from '../../database/connection';

const Menu = db.define<any>('menu', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    calories: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.ENUM({
            values: ['pizza', 'burger', 'extra']
        })
    },
}, {
    timestamps: false,
    freezeTableName: true
})

export default Menu;
