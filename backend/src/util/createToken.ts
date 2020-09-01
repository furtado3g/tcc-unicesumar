import jsonwebtoken from 'jsonwebtoken';
require('dotenv').config()
export default function (username:string,typeToken:string){
    const secret = "A$N0tH1nG"+typeToken
    const token = jsonwebtoken.sign({username},secret)
    return token 
}