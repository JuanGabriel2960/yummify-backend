import { Router } from 'express';
import { check } from 'express-validator';
import { customerLogin, customerRegister, adminLogin, adminRegister, renewToken } from '../controllers/auth';
import { validateCustomerEmail, validateAdminEmail } from '../helpers/validateDB';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

// API path: /api/auth
const router = Router()

router.post('/customer/login',
    [
        check('email', 'Email is required.').not().isEmpty(),
        check('email', 'Email is not valid.').isEmail(),
        check('password', 'Password is required.').not().isEmpty(),
        validateFields
    ],
    customerLogin)

router.post('/customer/register',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('name', 'Name is not valid.').isLength({ max: 20 }),
        check('email', 'Email is required.').not().isEmpty(),
        check('email', 'Email is not valid.').isLength({ max: 50 }),
        check('email', 'Email is not valid.').isEmail(),
        check('email').custom(validateCustomerEmail),
        check('password', 'Password is required.').not().isEmpty(),
        check('password', 'Password must contain at least 8 characters.').isLength({ min: 8 }),
        check('password', 'Password is not valid.').isLength({ max: 100 }),
        validateFields
    ],
    customerRegister)

router.get('/renew',
    validateJWT,
    renewToken
)

router.post('/admin/login',
    [
        check('email', 'Email is required.').not().isEmpty(),
        check('email', 'Email is not valid.').isEmail(),
        check('password', 'Password is required.').not().isEmpty(),
        validateFields
    ],
    adminLogin)

router.post('/admin/register',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('name', 'Name is not valid.').isLength({ max: 20 }),
        check('email', 'Email is required.').not().isEmpty(),
        check('email', 'Email is not valid.').isLength({ max: 50 }),
        check('email', 'Email is not valid.').isEmail(),
        check('email').custom(validateAdminEmail),
        check('password', 'Password is required.').not().isEmpty(),
        check('password', 'Password must contain at least 8 characters.').isLength({ min: 8 }),
        check('password', 'Password is not valid.').isLength({ max: 100 }),
        check('role', 'Role is required.').not().isEmpty(),
        check('role', 'Role is not valid.').isIn(['administrator', 'publisher', 'reader']),
        validateFields
    ],
    adminRegister)

export default router;
