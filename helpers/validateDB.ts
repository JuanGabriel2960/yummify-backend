import Customer from '../models/database/customer';
import Admin from '../models/database/admin';
import Menu from '../models/database/menu';

export const validateCustomerEmail = async (email: string) => {
    const emailExist = await Customer.findOne({ where: { email } })
    if (emailExist) {
        throw new Error('The email already exists.')
    }
}

export const validateAdminEmail = async (email: string) => {
    const emailExist = await Admin.findOne({ where: { email } })
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

export const validateMenuId = async (id: string) => {
    const idExist = await Menu.findByPk(id)
    if (!idExist) {
        throw new Error('The ID is not valid.')
    }
}

export const validateAdminId = async (id: string) => {
    const idExist = await Admin.findByPk(id)
    if (!idExist) {
        throw new Error('The ID is not valid.')
    }
}
