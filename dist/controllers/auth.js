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
exports.renewToken = exports.customerRegister = exports.customerLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customer_1 = __importDefault(require("../models/database/customer"));
const generateJWT_1 = require("../helpers/generateJWT");
const customerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const customer = yield customer_1.default.findOne({ where: { email } });
        if (!customer) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            });
        }
        const checkPassword = bcryptjs_1.default.compareSync(password, customer.password);
        if (!checkPassword) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            });
        }
        const token = yield generateJWT_1.generateJWT(customer.id, 'customer');
        res.json({
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.customerLogin = customerLogin;
const customerRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const customer = customer_1.default.build({ name, email, password });
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        customer.password = bcryptjs_1.default.hashSync(password, salt);
        yield customer.save();
        const token = yield generateJWT_1.generateJWT(customer.id, 'customer');
        res.json({
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.customerRegister = customerRegister;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authenticated, type } = req.body;
    const token = yield generateJWT_1.generateJWT(authenticated.id, type);
    res.json({
        authenticated,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map