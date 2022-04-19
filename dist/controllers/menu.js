"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFood = exports.deleteFood = exports.postFood = exports.getFoodById = exports.getMenu = void 0;
const sequelize_1 = require("sequelize");
const paginator_1 = require("../helpers/paginator");
const uploads_1 = require("../helpers/uploads");
const menu_1 = __importDefault(require("../models/database/menu"));
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { name, description, type } = req.query;
    try {
        const menu = yield menu_1.default.findAndCountAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: `%${name || ''}%`
                },
                description: {
                    [sequelize_1.Op.iLike]: `%${description || ''}%`
                },
                type: type || ['pizza', 'burger', 'extra']
            },
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ]
        });
        res.json({
            "count": menu.count,
            "next": paginator_1.nextOffset(menu.count, limit, offset),
            "previous": paginator_1.previousOffset(menu.count, limit, offset),
            "menu": menu.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.getMenu = getMenu;
const getFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const food = yield menu_1.default.findByPk(id);
        res.json(food);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.getFoodById = getFoodById;
const postFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, calories, image, type } = req.body;
    const { secure_url } = yield cloudinary.uploader.upload(image);
    const food = menu_1.default.build({ name, description, price, calories, image: secure_url, type });
    try {
        yield food.save();
        res.json({
            msg: 'Food added successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.postFood = postFood;
const deleteFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menu = yield menu_1.default.findByPk(id);
        const imageId = uploads_1.getCloudinaryImageId(menu.image);
        cloudinary.uploader.destroy(imageId);
        yield menu.destroy();
        res.json({
            msg: 'Food deleted successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.deleteFood = deleteFood;
const updateFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, calories, image, type } = req.body;
    const { secure_url } = yield cloudinary.uploader.upload(image);
    try {
        const menu = yield menu_1.default.findByPk(id);
        const imageId = uploads_1.getCloudinaryImageId(menu.image);
        cloudinary.uploader.destroy(imageId);
        yield menu.update({ name, description, price, calories, image: secure_url, type });
        res.json({
            msg: 'Food updated successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.updateFood = updateFood;
//# sourceMappingURL=menu.js.map