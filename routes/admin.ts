import { Router } from 'express';
import { check } from 'express-validator';
import { getAdministrators, getAdminById, postAdmin, activateAdmin, deleteAdmin, updateAdmin } from '../controllers/admin';
import { validateAdminEmail, validateAdminId } from '../helpers/validateDB';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

// API path: /api/admin
const router = Router()

router.get('/',
[
    validateJWT,
],
getAdministrators)

router.get('/:id',
[
    validateJWT,
    check('id').custom(validateAdminId),
    validateFields
],
getAdminById)

router.post('/',
[
    validateJWT,
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'Name is not valid.').isLength({ max: 50 }),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Email is not valid.').isLength({ max: 50 }),
    check('email', 'Email is not valid.').isEmail(),
    check('email').custom(validateAdminEmail),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters.').isLength({ min: 8 }),
    check('password', 'Password is not valid.').isLength({ max: 100 }),
    check('role', 'Role is required.').not().isEmpty(),
    validateFields
],
postAdmin)

router.patch('/:id',
[
    validateJWT,
    check('status', 'Status is required.').not().isEmpty(),
    check('status', 'Status is not valid.').isBoolean(),
    validateFields
],
activateAdmin)

router.delete('/:id',
[
    validateJWT,
    check('id').custom(validateAdminId),
    validateFields
],
deleteAdmin)

router.put('/:id',
[
    validateJWT,
    check('id').custom(validateAdminId),
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'Name is not valid.').isLength({ max: 50 }),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Email is not valid.').isLength({ max: 50 }),
    check('email', 'Email is not valid.').isEmail(),
    check('password', 'Password must contain at least 8 characters.').optional().isLength({ min: 8 }),
    check('password', 'Password is not valid.').isLength({ max: 100 }),
    check('role', 'Role is required.').not().isEmpty(),
    validateFields
],
updateAdmin)

export default router;
