import createToken from "../util/createToken"

export default class sessionController{
    async newSession(username:string){
        const authToken = await createToken(username,'auth')
        const sessionToken = await createToken(username,'session'+ Date.now())
        const token = {
            userName : username, 
            authToken,
            sessionToken
        }
        return token.sessionToken
    }
}