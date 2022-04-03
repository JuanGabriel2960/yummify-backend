import { Router } from 'express';
import { check } from 'express-validator';
import { getMenu, getFoodById, postFood, deleteFoodById, updateFood } from '../controllers/menu';
import { validateMenuId } from '../helpers/validateDB';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

// API path: /api/menu
const router = Router()

router.get('/',
[
    validateJWT,
],
getMenu)

router.get('/:id',
[
    validateJWT,
    check('id').custom(validateMenuId),
    validateFields
],
getFoodById)

router.post('/',
[
    validateJWT,
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'Name is not valid.').isLength({ max: 50 }),
    check('description', 'Description is required.').not().isEmpty(),
    check('description', 'description is not valid.').isLength({ max: 100 }),
    check('price', 'Price is required.').not().isEmpty(),
    check('calories', 'Calories is required.').not().isEmpty(),
    check('image', 'Image is required.').not().isEmpty(),
    check('type', 'Type is required.').not().isEmpty(),
    validateFields
],
postFood)

router.delete('/:id',
[
    validateJWT,
    check('id').custom(validateMenuId),
    validateFields
],
deleteFoodById)

router.put('/:id',
[
    validateJWT,
    check('id').custom(validateMenuId),
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'Name is not valid.').isLength({ max: 50 }),
    check('description', 'Description is required.').not().isEmpty(),
    check('description', 'description is not valid.').isLength({ max: 100 }),
    check('price', 'Price is required.').not().isEmpty(),
    check('calories', 'Calories is required.').not().isEmpty(),
    check('image', 'Image is required.').not().isEmpty(),
    check('type', 'Type is required.').not().isEmpty(),
    validateFields
],
updateFood)

export default router;
