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
        const sql = 'update users as usuarios'
                   +'set `usuarios`.`name` = name,'
                   +'`usuarios`.`PASSWORD` = password,'
                   +'`usuarios`.`email` = email,'
                   +'`usuarios`.`last_password` = usuarios.PASSWORD'
                   +'`usuarios`.`user_type` = user_type'
                   + 'where `usuarios`.`id` = id'
        return await db.raw(sql);
    }
}