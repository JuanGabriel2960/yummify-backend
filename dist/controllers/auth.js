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
exports.renewToken = exports.adminRegister = exports.adminLogin = exports.customerRegister = exports.customerLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customer_1 = __importDefault(require("../models/database/customer"));
const admin_1 = __importDefault(require("../models/database/admin"));
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
        if (!customer.status) {
            return res.status(400).json({
                msg: 'Your account has been deactivated.'
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
        console.log(error);
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
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.customerRegister = customerRegister;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield admin_1.default.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            });
        }
        if (!admin.status) {
            return res.status(400).json({
                msg: 'Your account is not activated, contact the administrator.'
            });
        }
        const checkPassword = bcryptjs_1.default.compareSync(password, admin.password);
        if (!checkPassword) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            });
        }
        const token = yield generateJWT_1.generateJWT(admin.id, 'admin');
        res.json({
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.adminLogin = adminLogin;
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const admin = admin_1.default.build({ name, email, password, role });
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        admin.password = bcryptjs_1.default.hashSync(password, salt);
        yield admin.save();
        const token = yield generateJWT_1.generateJWT(admin.id, 'admin');
        res.json({
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error.'
        });
    }
});
exports.adminRegister = adminRegister;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authenticated, authenticated_type } = req.cookies;
    const token = yield generateJWT_1.generateJWT(authenticated.id, authenticated_type);
    res.json({
        authenticated,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map