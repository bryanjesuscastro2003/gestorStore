import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateJwt = (payload: {data: string}): string | null => {
    try {
        return jwt.sign(payload, process.env.JWTSECRET!, {expiresIn: '3h'})
    } catch (error) {
        return null
    }   
}

export const verifyJwt = (token: string): string | object | null => {
    try {
        return jwt.verify(token, process.env.JWTSECRET!)
    } catch (error) {
        return null
    }
}