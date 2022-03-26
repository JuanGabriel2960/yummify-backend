import { Router } from 'express';
import { getMenu } from '../controllers/menu';
import { validateJWT } from '../middlewares/validateJWT';

// API path: /api/menu
const router = Router()

router.get('/',
[
    validateJWT,
],
getMenu)

export default router;
