import { randomBytes } from "crypto";
import db from "../database/connection";
import digestHash from '../util/digestHash'
import  Mail from '../util/mailer'
import fs from 'fs'

interface userInterface{
    name:string;
    username:string;
    email:string
    password:string;
    last_password:string;
    user_type : string;
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
        console.log('usernameExists')
        console.log(usernameExists)
        if(usernameExists[0]){
            return {
                "error" : "Username is already registered"
            }
        }
        const emailExists = await db('users')
        .select('*')
        .where('email',user.email)
        console.log('emailExists')
        console.log(emailExists)
        if(emailExists[0]){
            return {
                "error" : "Email is already registered"
            }
        }
        console.log(emailExists)
        const insertedRows = await db('users').insert(user)
        console.log('insertedRows')
        console.log(insertedRows)
        return insertedRows
    }

    async verifyUser(user:authUser){
        let returnable 
        const usernameExists = await db('users')
        .select('*')
        .where('username',user.username)
        if(usernameExists[0]){
            returnable =  {
                "error" : "Username is already registered"
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
        const returnable = {
            message: "message"
        }
        const users = await db('users')
        .select('password')
        .where('username',user.username);
        if(!users[0])return {message:"No user found"} 
        await db('users')
        .where('username',user.username)
        .update({
            name:user.name,
            email:user.email,
            user_type : user.user_type
        })
        .then((data: any)=>{
            returnable.message = "User has been updated"
        })
        .catch((e: any)=>{
            returnable.message = "Error when updating user"
        })
    }

    async recoveryPassword(email:string){
        let random = randomBytes(20).toString('hex');
        let digestedRandom = digestHash(random)
        let returnable:any
        const user = await db('users')
        .select('password','id')
        .where('email',email);
        if(!user[0]) return false;
        Mail.to = email
        Mail.subject = "Email de recuperação de senha" 
        Mail.message = "Sua senha foi recuperada por meio do processo de recuperar minha senha <br> Sua nova senha é : "+random
        Mail.sendMail()
        const updatedRows = await db('users')
        .where('id',user[0].id)
        .update({
            password : digestedRandom,
            last_password : user[0].password
        })
        .then((data: any)=>{
            returnable = true
        })
        .catch((e: any)=>{
            returnable = false
        })
        return returnable
    }

    async updatePassword(userId:any,newPassword:string){
        let returnable = {updated:true}
        const user = await db('users')
        .select('password')
        .where('id',userId);
        if(!user[0])return {message:"No user found"}
        const updatedRows = db('users')
        .where('id',userId)
        .update({
            password : newPassword,
            last_password : user[0].password
        })
        .then(async(data: any)=>{
            console.log(await data)
            returnable={updated:true}
        })
        .catch((e: any)=>{returnable={updated:false}})
        return returnable
    }

    async checkAtualPassword(userId:any,actualPassword:string){
        let returnable:boolean = true
        await db('users')
        .where('id',userId)
        .where('password',actualPassword)
        .select('*')
        .then((data: any)=>{
            console.log(data)
            if(!data[0]) returnable = false
        })
        .catch((e: any)=>{returnable = false})
        return returnable
    }

    async detail (usersId: string){
        let returnable
        await db('users')
        .where('id', usersId)
        .select('*')
        .then((data)=>{
            returnable = data[0]
        }).catch(err=>{
            returnable = {
                error : "When getting user has ocorred an error"
            }
        })
        return returnable
    }
}