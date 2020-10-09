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
        const emailExists = await db('users')
        .select('*')
        .where('email',user.email)
        if(emailExists[0]){
            return {
                "error" : "Username is already registered"
            }
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
            password:user.password,
            last_password:users[0].password
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

    async updatePassword(userId:string,newPassword:string){
        let returnable
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
        .then((data: any)=>returnable={updated:true})
        .catch((e: any)=>{returnable={updated:false}})
        return returnable
    }
}