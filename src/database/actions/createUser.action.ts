// User model 
import { UserModel } from "../models/User.model"
// User Interfacd 
import { IUser } from "../models/interfaces/User.interface"
// hash method
import { hashPassword } from "../../utils/Data.utils"
import { findUser } from "./comm/findUser.action"

export const createUser = async (payload: IUser) : Promise<IUser> => {
    try {
        payload.password = await hashPassword(payload.password)
        const userAvailable = await findUser(payload)
        if(userAvailable !== null) throw new Error("User already exists")
        const user = await UserModel.create(payload)
        return user
    } catch (error) {
        throw new Error(typeof error === "object" && error instanceof Error ? error.message : "An error occurred while creating the user. Please try again.")
    }
}


