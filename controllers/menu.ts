import { Request, Response } from 'express';
import Menu from '../models/database/menu'

export const getMenu = async (req: Request, res: Response) => {
    const { type } = req.query;

    try {
        const menu = await Menu.findAll({
            where: {
                type: type as string || ['pizza', 'burger', 'extra']
            },
            attributes: {
                exclude: ['id']
            }
        })

        res.json(menu)
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}
