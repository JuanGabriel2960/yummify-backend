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
exports.getMenu = void 0;
const paginator_1 = require("../helpers/paginator");
const menu_1 = __importDefault(require("../models/database/menu"));
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { type } = req.query;
    try {
        const menu = yield menu_1.default.findAndCountAll({
            where: {
                type: type || ['pizza', 'burger', 'extra']
            },
            limit: limit,
            offset: offset,
            attributes: {
                exclude: ['id']
            }
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
//# sourceMappingURL=menu.js.map