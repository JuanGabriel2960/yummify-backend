import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import { Op } from 'sequelize';
import { nextOffset, previousOffset } from '../helpers/paginator';
import Admin from '../models/database/admin'

export const getAdministrators = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const { name, email, status, role } = req.query;

    try {
        const administrators = await Admin.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name || ''}%`
                },
                email: {
                    [Op.iLike]: `%${email || ''}%`
                },
                role: role as string || ['administrator', 'publisher', 'reader']
            },
            attributes: {
                exclude: ['password']
            },
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ]
        })

        res.json({
            "count": administrators.count,
            "next": nextOffset(administrators.count, limit, offset),
            "previous": previousOffset(administrators.count, limit, offset),
            "administrators": administrators.rows
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const getAdminById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByPk(id as string, { attributes: { exclude: ['password'] } })

        res.json(admin)
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const postAdmin = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body
    const admin = Admin.build({ name, email, password, role })

    try {
        const salt = bcryptjs.genSaltSync()
        admin.password = bcryptjs.hashSync(password, salt)

        await admin.save()

        res.json({
            msg: 'Admin added successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Admin.destroy({
            where: {
                id
            }
        })

        res.json({
            msg: 'Admin deleted successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body

    try {
        const emailExist = await Admin.findOne({ where: { email } })
        if (emailExist && emailExist.id != id) {
            return res.status(500).json({
                msg: 'The email already exists.'
            })
        }

        if (password) {
            const salt = bcryptjs.genSaltSync()
            const encryptedPassword = bcryptjs.hashSync(password, salt)

            await Admin.update(
                { name, email, password: encryptedPassword, role },
                {
                    where: {
                        id
                    }
                }
            )
        } else {
            await Admin.update(
                { name, email, role },
                {
                    where: {
                        id
                    }
                }
            )
        }

        res.json({
            msg: 'Admin updated successfully.'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}
