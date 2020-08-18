import db from "../database/connection";
import { serialize } from "v8";

interface userInterface{
    name:string;
    userName:string;
    email:string
    password:string;
    last_password:string;
}

interface authUser{
    username:string;
    password:string;
}

export default class UserModel{
    async create(user:userInterface){
        const insertedRows = await db.insert(user).table('users')
        return insertedRows
    }
    async verifyUser(user:authUser){
        let is_valid:boolean = true
        const search = await db('users')
            .whereRaw('userName = ?',user.username)
            .whereRaw('password = ?',user.password)
        if(search.length == 0){
            is_valid = false
        }
        return is_valid
    }
}