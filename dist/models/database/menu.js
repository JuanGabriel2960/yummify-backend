"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Menu = connection_1.default.define('menu', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    calories: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.ENUM({
            values: ['pizza', 'burger', 'extra']
        })
    },
}, {
    timestamps: false,
    freezeTableName: true
});
exports.default = Menu;
//# sourceMappingURL=menu.js.map