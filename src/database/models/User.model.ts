import { prop, getModelForClass, ModelOptions } from '@typegoose/typegoose';
import { IUser, IUserRole } from './interfaces/User.interface';


// set db name 
@ModelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User implements IUser{

  @prop({ required: true, unique: true})
  public name!: string;

  @prop({ required: true, unique: true})
  public email!: string;

  @prop({ required: true })
  public password!: string;


  @prop({ required: true, enum: IUserRole, default: IUserRole.MODERATOR})
  public role!: IUserRole;
    

}

export const UserModel = getModelForClass(User);

