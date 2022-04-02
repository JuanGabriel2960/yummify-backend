import { Request, Response } from 'express';
import { nextOffset, previousOffset } from '../helpers/paginator';
import Menu from '../models/database/menu'

export const getMenu = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { type } = req.query;

    try {
        const menu = await Menu.findAndCountAll({
            where: {
                type: type as string || ['pizza', 'burger', 'extra']
            },
            limit: limit,
            offset: offset,
            attributes: {
                exclude: ['id']
            }
        })

        res.json({
            "count": menu.count,
            "next": nextOffset(menu.count, limit, offset),
            "previous": previousOffset(menu.count, limit, offset),
            "menu": menu.rows
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}
