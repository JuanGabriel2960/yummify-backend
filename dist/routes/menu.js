"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_1 = require("../controllers/menu");
const validateJWT_1 = require("../middlewares/validateJWT");
// API path: /api/menu
const router = express_1.Router();
router.get('/', [
    validateJWT_1.validateJWT,
], menu_1.getMenu);
exports.default = router;
//# sourceMappingURL=menu.js.map