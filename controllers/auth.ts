import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import Customer from '../models/database/customer'
import Admin from '../models/database/admin'
import { generateJWT } from '../helpers/generateJWT'

export const customerLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const customer = await Customer.findOne({ where: { email } })

        if (!customer) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        if (!customer.status) {
            return res.status(400).json({
                msg: 'Your account has been deactivated.'
            });
        }

        const checkPassword = bcryptjs.compareSync(password, customer.password)
        if (!checkPassword) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        const token = await generateJWT(customer.id, 'customer')

        res.json({
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const customerRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const customer = Customer.build({ name, email, password })

    try {
        const salt = bcryptjs.genSaltSync()
        customer.password = bcryptjs.hashSync(password, salt)

        await customer.save()

        const token = await generateJWT(customer.id, 'customer')

        res.json({
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.findOne({ where: { email } })

        if (!admin) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        if (!admin.status) {
            return res.status(400).json({
                msg: 'Your account is not activated, contact the administrator.'
            });
        }

        const checkPassword = bcryptjs.compareSync(password, admin.password)
        if (!checkPassword) {
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        const token = await generateJWT(admin.id, 'admin')

        res.json({
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const adminRegister = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body
    const admin = Admin.build({ name, email, password, role })

    try {
        const salt = bcryptjs.genSaltSync()
        admin.password = bcryptjs.hashSync(password, salt)

        await admin.save()

        const token = await generateJWT(admin.id, 'admin')

        res.json({
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const renewToken = async (req: Request, res: Response) => {
    const { authenticated, authenticated_type } = req.cookies
    const token = await generateJWT(authenticated.id, authenticated_type)

    res.json({
        authenticated,
        token
    })
}
