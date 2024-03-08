import { UserModel } from "../models/User.model"
import {comparePassword } from "../../utils/Data.utils"
import { ILogin, IUser } from "../models/interfaces/User.interface"
import { findUser } from "./comm/findUser.action"
import { generateJwt } from "../../utils/SessionManager.utils"


export const loginUser = async (payload: ILogin): Promise<IUser> => {
    try {
        const user = await findUser({email: payload.email, name: "" })
        if(user === null) throw new Error("User not found")
        const session = generateJwt({data: user.email})
        if(session === null) throw new Error("An error occurred while generating the token")
        if(!await comparePassword(payload.password, user.password)) throw new Error("Invalid password")
        user.jwt = session
        return user
    } catch (error) {
          throw new Error(typeof error === "object" && error instanceof Error ? error.message : "An error occurred while accessing the user. Please try again.")
    }
} 