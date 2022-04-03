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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_1 = __importDefault(require("../models/database/customer"));
const admin_1 = __importDefault(require("../models/database/admin"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'The token is missing.'
        });
    }
    token = token.replace(/^Bearer\s+/, "");
    try {
        const { id, authenticated_type } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (authenticated_type === 'customer') {
            var authenticated = yield customer_1.default.findByPk(id, { attributes: { exclude: ['password'] } });
        }
        else if (authenticated_type === 'admin') {
            var authenticated = yield admin_1.default.findByPk(id, { attributes: { exclude: ['password'] } });
        }
        if (!authenticated || !authenticated.status) {
            return res.status(401).json({
                msg: 'The token is not valid.'
            });
        }
        req.cookies = {
            authenticated_type,
            authenticated
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'The token is not valid.'
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map