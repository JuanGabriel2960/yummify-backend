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
exports.updateAdmin = exports.deleteAdmin = exports.postAdmin = exports.getAdminById = exports.getAdministrators = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const paginator_1 = require("../helpers/paginator");
const admin_1 = __importDefault(require("../models/database/admin"));
const getAdministrators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { name, email, status, role } = req.query;
    try {
        const administrators = yield admin_1.default.findAndCountAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: `%${name || ''}%`
                },
                email: {
                    [sequelize_1.Op.iLike]: `%${email || ''}%`
                },
                role: role || ['administrator', 'publisher', 'reader']
            },
            attributes: {
                exclude: ['password']
            },
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ]
        });
        res.json({
            "count": administrators.count,
            "next": paginator_1.nextOffset(administrators.count, limit, offset),
            "previous": paginator_1.previousOffset(administrators.count, limit, offset),
            "administrators": administrators.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.getAdministrators = getAdministrators;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield admin_1.default.findByPk(id, { attributes: { exclude: ['password'] } });
        res.json(admin);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.getAdminById = getAdminById;
const postAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const admin = admin_1.default.build({ name, email, password, role });
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        admin.password = bcryptjs_1.default.hashSync(password, salt);
        yield admin.save();
        res.json({
            msg: 'Admin added successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.postAdmin = postAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield admin_1.default.destroy({
            where: {
                id
            }
        });
        res.json({
            msg: 'Admin deleted successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.deleteAdmin = deleteAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    try {
        const emailExist = yield admin_1.default.findOne({ where: { email } });
        if (emailExist && emailExist.id != id) {
            return res.status(500).json({
                msg: 'The email already exists.'
            });
        }
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync();
            const encryptedPassword = bcryptjs_1.default.hashSync(password, salt);
            yield admin_1.default.update({ name, email, password: encryptedPassword, role }, {
                where: {
                    id
                }
            });
        }
        else {
            yield admin_1.default.update({ name, email, role }, {
                where: {
                    id
                }
            });
        }
        res.json({
            msg: 'Admin updated successfully.'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=admin.js.map