import db from "../database/connection";

interface userInterface{
    name:string;
    username:string;
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
        const insertedRows = await db('users').insert(user)
        return insertedRows
    }
    async verifyUser(user:authUser){
        let is_valid:boolean = true
        const search = await db('users')
            .whereRaw('username = ?',user.username)
            .whereRaw('password = ?',user.password)
        if(search.length == 0){
            is_valid = false
        }
        return {is_valid,user:search[0]}
    }
    async update(user:userInterface){
        return await db('users')
        .where('username',user.username)
        .update(user);
    }
}