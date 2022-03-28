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
exports.validateID = exports.validateAdminEmail = exports.validateCustomerEmail = void 0;
const customer_1 = __importDefault(require("../models/database/customer"));
const admin_1 = __importDefault(require("../models/database/admin"));
const validateCustomerEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield customer_1.default.findOne({ where: { email } });
    if (emailExist) {
        throw new Error('The email already exists.');
    }
});
exports.validateCustomerEmail = validateCustomerEmail;
const validateAdminEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield admin_1.default.findOne({ where: { email } });
    if (emailExist) {
        throw new Error('The email already exists.');
    }
});
exports.validateAdminEmail = validateAdminEmail;
const validateID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idExist = yield customer_1.default.findByPk(id);
    if (!idExist) {
        throw new Error('The ID is not valid.');
    }
});
exports.validateID = validateID;
//# sourceMappingURL=validateDB.js.map