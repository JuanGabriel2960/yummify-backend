"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validateDB_1 = require("../helpers/validateDB");
const validateFields_1 = require("../middlewares/validateFields");
const validateJWT_1 = require("../middlewares/validateJWT");
// API path: /api/auth
const router = express_1.Router();
router.post('/customer/login', [
    express_validator_1.check('email', 'Email is required.').not().isEmpty(),
    express_validator_1.check('email', 'Email is not valid.').isEmail(),
    express_validator_1.check('password', 'Password is required.').not().isEmpty(),
    validateFields_1.validateFields
], auth_1.customerLogin);
router.post('/customer/register', [
    express_validator_1.check('name', 'Name is required.').not().isEmpty(),
    express_validator_1.check('name', 'Name is not valid.').isLength({ max: 50 }),
    express_validator_1.check('email', 'Email is required.').not().isEmpty(),
    express_validator_1.check('email', 'Email is required.').isLength({ max: 500 }),
    express_validator_1.check('email', 'Email is not valid.').isEmail(),
    express_validator_1.check('email').custom(validateDB_1.validateEmail),
    express_validator_1.check('password', 'Password is required.').not().isEmpty(),
    express_validator_1.check('password', 'Password must contain at least 8 characters.').isLength({ min: 8 }),
    express_validator_1.check('password', 'Password is not valid.').isLength({ max: 100 }),
    validateFields_1.validateFields
], auth_1.customerRegister);
router.get('/renew', validateJWT_1.validateJWT, auth_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.js.map