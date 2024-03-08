export enum IUserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: IUserRole;
    _id?: any;
    jwt?: string;
}

// EXTENDS IUSER ONLY (name, email)
export interface IQueryForUser extends Pick<IUser, 'name' | 'email'> {} 

export interface ILogin {
    email: string;
    password: string;
}