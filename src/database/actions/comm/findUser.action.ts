import { UserModel } from "../../models/User.model"
import { IQueryForUser, IUser } from "../../models/interfaces/User.interface"


export const findUser = async (payload: IQueryForUser): Promise<IUser | null> => {
    try {
          const user = await UserModel.findOne({$or: [{email: payload.email}, {name: payload.name}]})
          return user    
    } catch (error) {
          throw new Error(typeof error === "object" && error instanceof Error ? error.message : "An error occurred while creating the user. Please try again.")
    }
 }
 
 