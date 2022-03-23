import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import Customer from '../models/database/customer'
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
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

export const renewToken = async (req: Request, res: Response) => {
    const { authenticated, type } = req.body
    const token = await generateJWT(authenticated.id, type)

    res.json({
        authenticated,
        token
    })
}
