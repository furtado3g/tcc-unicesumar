import jsonwebtoken from 'jsonwebtoken';
export default function (username:string,typeToken:string){
    const secret = "A$N0tH1nG"+typeToken
    const token = jsonwebtoken.sign({username},secret)
    console.log(token)
    return token 
}