"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id, authenticated_type) => {
    return new Promise((resolve, reject) => {
        const payload = { id, authenticated_type };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                reject('Error generating JWT.');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generateJWT.js.map