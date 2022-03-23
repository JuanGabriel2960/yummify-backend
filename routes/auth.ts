import { Router } from 'express';
import { check } from 'express-validator';
import { customerLogin, customerRegister, renewToken } from '../controllers/auth';
import { validateEmail }  from '../helpers/validateDB';
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
    check('name', 'Name is not valid.').isLength({max: 50}),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Email is required.').isLength({max: 500}),
    check('email', 'Email is not valid.').isEmail(),
    check('email').custom(validateEmail),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters.').isLength({min: 8}),
    check('password', 'Password is not valid.').isLength({max: 100}),
    validateFields
],
customerRegister)

router.get('/renew',
    validateJWT,
    renewToken
)

export default router;
