import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/database/customer';
import Admin from '../models/database/admin';

export interface JWTPayload {
    id: number;
    authenticated_type: 'admin' | 'customer';
    iat: number;
    exp: number;
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'The token is missing.'
        })
    }

    token = token.replace(/^Bearer\s+/, "");

    try {
        const { id, authenticated_type } = jwt.verify(token, process.env.SECRET_KEY as string) as JWTPayload;

        if (authenticated_type === 'customer') {
            var authenticated = await Customer.findByPk(id, { attributes: { exclude: ['password'] } })
        } else if (authenticated_type === 'admin') {
            var authenticated = await Admin.findByPk(id, { attributes: { exclude: ['password'] } })
        }

        if (!authenticated || !authenticated.status) {
            return res.status(401).json({
                msg: 'The token is not valid.'
            })
        }

        req.cookies = {
            authenticated_type,
            authenticated
        }

        next()
    } catch (error) {
        res.status(401).json({
            msg: 'The token is not valid.'
        })
    }
}
