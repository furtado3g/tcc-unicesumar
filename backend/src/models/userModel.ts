import { randomBytes } from "crypto";
import db from "../database/connection";
import digestHash from '../util/digestHash'

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
        let returnable 
        const search = await db('users')
        .whereRaw('username = ?',user.username)
        .whereRaw('password = ?',user.password)
        .then(data=>{returnable={is_valid:true,user:data}})
        .catch(e=>{returnable={is_valid : false,user:null}})
        return returnable
    }
    
    async update(user:userInterface){
        return await db('users')
        .where('username',user.username)
        .update(user);
    }

    async recoveryPassword(username:string){
        let random = randomBytes(20).toString('hex');
        random = digestHash(random)
        let returnable:any
        const {password} = await db('users')
        .select('password')
        .where('username',username);
        const updatedRows = db('users')
        .where('username',username)
        .update({
            password : random,
            last_password : password
        })
        .then(data=>returnable=true)
        .catch(e=>{returnable=false})
        return returnable
    }

    async updatePassword(userId:number,newPassword:string){
        let returnable
        const {password} = await db('users')
        .select('password')
        .where('id',userId);
        const updatedRows = db('users')
        .where('id',userId)
        .update({
            password : newPassword,
            last_password : password
        })
        .then(data=>returnable={updated:true})
        .catch(e=>{returnable={updated:false}})
        return returnable
    }
}