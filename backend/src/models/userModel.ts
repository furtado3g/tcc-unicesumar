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
        const usernameExists = await db('users')
        .select('*')
        .where('username',user.username)
        if(usernameExists[0]){
            return {
                "status" : "Username is already registered"
            }
        }
        const emailExists = await db('users')
        .select('*')
        .where('email',user.email)
        if(emailExists[0]){
            return {
                "error" : "Username is already registered"
            }
        }
        const insertedRows = await db('users').insert(user)
        return insertedRows
    }

    async verifyUser(user:authUser){
        let returnable 
        const usernameExists = await db('users')
        .select('*')
        .where('username',user.username)
        if(usernameExists[0]){
            returnable =  {
                "status" : "Username is already registered"
            }
        }
        const search = await db('users')
        .where('username',user.username)
        .where('password',user.password)
        .then((data: any[])=>{
            if(data[0]){
                returnable={is_valid : true,user:data[0]}
            }else{
                returnable={is_valid : false,user:null}
            }
        })
        .catch((e: any)=>{returnable={is_valid : false,user:null}})
        return returnable
    }
    
    async update(user:any){
        const usernameExists = await db('users')
        .select('*')
        .where('username',user.username)
        if(usernameExists[0]){
            return {
                "status" : "Username is already registered"
            }
        }
        const emailExists = await db('users')
        .select('*')
        .where('email',user.email)
        if(emailExists[0]){
            return {
                "error" : "Username is already registered"
            }
        }
        const {password} = await db('users')
        .select('password')
        .where('username',user.username);
        return await db('users')
        .where('username',user.username)
        .update({
            name:user.name,
            email:user.email,
            password:user.password,
            last_password:password
        });
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
        .then((data: any)=>{
            console.log(data);returnable=true
        })
        .catch((e: any)=>{
            console.log(e);
            returnable=false
        })
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
        .then((data: any)=>returnable={updated:true})
        .catch((e: any)=>{returnable={updated:false}})
        return returnable
    }
}