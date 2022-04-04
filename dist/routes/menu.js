"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const menu_1 = require("../controllers/menu");
const validateDB_1 = require("../helpers/validateDB");
const validateFields_1 = require("../middlewares/validateFields");
const validateJWT_1 = require("../middlewares/validateJWT");
// API path: /api/menu
const router = express_1.Router();
router.get('/', [
    validateJWT_1.validateJWT,
], menu_1.getMenu);
router.get('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateMenuId),
    validateFields_1.validateFields
], menu_1.getFoodById);
router.post('/', [
    validateJWT_1.validateJWT,
    express_validator_1.check('name', 'Name is required.').not().isEmpty(),
    express_validator_1.check('name', 'Name is not valid.').isLength({ max: 50 }),
    express_validator_1.check('description', 'Description is required.').not().isEmpty(),
    express_validator_1.check('description', 'description is not valid.').isLength({ max: 100 }),
    express_validator_1.check('price', 'Price is required.').not().isEmpty(),
    express_validator_1.check('calories', 'Calories is required.').not().isEmpty(),
    express_validator_1.check('image', 'Image is required.').not().isEmpty(),
    express_validator_1.check('type', 'Type is required.').not().isEmpty(),
    validateFields_1.validateFields
], menu_1.postFood);
router.delete('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateMenuId),
    validateFields_1.validateFields
], menu_1.deleteFoodById);
router.put('/:id', [
    validateJWT_1.validateJWT,
    express_validator_1.check('id').custom(validateDB_1.validateMenuId),
    express_validator_1.check('name', 'Name is required.').not().isEmpty(),
    express_validator_1.check('name', 'Name is not valid.').isLength({ max: 50 }),
    express_validator_1.check('description', 'Description is required.').not().isEmpty(),
    express_validator_1.check('description', 'description is not valid.').isLength({ max: 100 }),
    express_validator_1.check('price', 'Price is required.').not().isEmpty(),
    express_validator_1.check('calories', 'Calories is required.').not().isEmpty(),
    express_validator_1.check('image', 'Image is required.').not().isEmpty(),
    express_validator_1.check('type', 'Type is required.').not().isEmpty(),
    validateFields_1.validateFields
], menu_1.updateFood);
exports.default = router;
//# sourceMappingURL=menu.js.map