import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { nextOffset, previousOffset } from '../helpers/paginator';
import { getCloudinaryImageId } from '../helpers/uploads';
import Menu from '../models/database/menu'

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

export const getMenu = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { name, description, type } = req.query;

    try {
        const menu = await Menu.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name || ''}%`
                },
                description: {
                    [Op.iLike]: `%${description || ''}%`
                },
                type: type as string || ['pizza', 'burger', 'extra']
            },
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ]
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

export const getFoodById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const food = await Menu.findByPk(id as string)

        res.json(food)
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const postFood = async (req: Request, res: Response) => {
    const { name, description, price, calories, image, type } = req.body
    const { secure_url } = await cloudinary.uploader.upload(image);

    const food = Menu.build({ name, description, price, calories, image: secure_url, type })

    try {
        await food.save()

        res.json({
            msg: 'Food added successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const deleteFood = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const menu = await Menu.findByPk(id as string)

        const imageId = getCloudinaryImageId(menu.image)
        cloudinary.uploader.destroy(imageId);

        await menu.destroy()

        res.json({
            msg: 'Food deleted successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const updateFood = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, calories, image, type } = req.body

    const { secure_url } = await cloudinary.uploader.upload(image);

    try {
        const menu = await Menu.findByPk(id as string)

        const imageId = getCloudinaryImageId(menu.image)
        cloudinary.uploader.destroy(imageId);

        await menu.update(
            { name, description, price, calories, image: secure_url, type },
        )

        res.json({
            msg: 'Food updated successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}
