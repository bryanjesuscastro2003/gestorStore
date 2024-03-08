import { verifyJwt } from "../../utils/SessionManager.utils";
import { IUser } from "../models/interfaces/User.interface";
import { findUser } from "./comm/findUser.action";

export const getSession = async (payload: {token: string}): Promise<IUser> => {
  try {
    const jwtData: any = verifyJwt(payload.token)
    if(jwtData === null) throw new Error("Invalid session")
    const user = await findUser({email: jwtData.data, name: ""})
    if(user === null) throw new Error("User not found")
    return user
  } catch (error) {
    throw new Error(typeof error === "object" && error instanceof Error ? error.message : "An error occurred while accessing the user. Please try again.")
  }
}