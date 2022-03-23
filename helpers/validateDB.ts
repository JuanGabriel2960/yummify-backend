import Customer from '../models/database/customer';

export const validateEmail = async (email: string) => {
    const emailExist = await Customer.findOne({ where: { email } })
    if (emailExist) {
        throw new Error('The email already exists.')
    }
}

export const validateID = async (id: string) => {
    const idExist = await Customer.findByPk(id)
    if (!idExist) {
        throw new Error('The ID is not valid.')
    }
}