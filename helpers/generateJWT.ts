import jwt from 'jsonwebtoken';

export const generateJWT = (id: number, authenticated_type: 'customer' | 'admin') => {
    return new Promise((resolve, reject) => {
        const payload = { id, authenticated_type }

        jwt.sign(payload, process.env.SECRET_KEY as string, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                reject('Error generating JWT.')
            } else {
                resolve(token)
            }
        })
    })
}
