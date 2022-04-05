"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const admin_1 = require("../controllers/admin");
const validateDB_1 = require("../helpers/validateDB");
const validateFields_1 = require("../middlewares/validateFields");
const validateJWT_1 = require("../middlewares/validateJWT");
// API path: /api/admin
const router = express_1.Router();
router.get('/', [
    validateJWT_1.validateJWT,
], admin_1.getAdministrators);
router.get('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateAdminId),
    validateFields_1.validateFields
], admin_1.getAdminById);
router.post('/', [
    validateJWT_1.validateJWT,
    express_validator_1.check('name', 'Name is required.').not().isEmpty(),
    express_validator_1.check('name', 'Name is not valid.').isLength({ max: 50 }),
    express_validator_1.check('email', 'Email is required.').not().isEmpty(),
    express_validator_1.check('email', 'Email is not valid.').isLength({ max: 50 }),
    express_validator_1.check('email', 'Email is not valid.').isEmail(),
    express_validator_1.check('email').custom(validateDB_1.validateAdminEmail),
    express_validator_1.check('password', 'Password is required.').not().isEmpty(),
    express_validator_1.check('password', 'Password must contain at least 8 characters.').isLength({ min: 8 }),
    express_validator_1.check('password', 'Password is not valid.').isLength({ max: 100 }),
    express_validator_1.check('role', 'Role is required.').not().isEmpty(),
    validateFields_1.validateFields
], admin_1.postAdmin);
router.delete('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateAdminId),
    validateFields_1.validateFields
], admin_1.deleteAdmin);
router.put('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateAdminId),
    express_validator_1.check('name', 'Name is required.').not().isEmpty(),
    express_validator_1.check('name', 'Name is not valid.').isLength({ max: 50 }),
    express_validator_1.check('email', 'Email is required.').not().isEmpty(),
    express_validator_1.check('email', 'Email is not valid.').isLength({ max: 50 }),
    express_validator_1.check('email', 'Email is not valid.').isEmail(),
    express_validator_1.check('password', 'Password must contain at least 8 characters.').optional().isLength({ min: 8 }),
    express_validator_1.check('password', 'Password is not valid.').isLength({ max: 100 }),
    express_validator_1.check('role', 'Role is required.').not().isEmpty(),
    validateFields_1.validateFields
], admin_1.updateAdmin);
exports.default = router;
//# sourceMappingURL=admin.js.map