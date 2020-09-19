import createToken from "../util/createToken"
import SessionModel from "../models/sessionModel"
import {Request,Response} from 'express'
import db from "../database/connection"

export default class sessionController{
    
    async newSession(userId:string){
        const model = new SessionModel()
        const authToken = await createToken(userId,'auth')
        const sessionToken = await createToken(userId,'session'+ Date.now())
        const token = {
            userId : userId, 
            authToken,
            sessionToken
        }
        const insertedSession = await model.create(token)
        const data = await db('access').select('expires_at').where('session_token','=',sessionToken)
        console.log(data)
        const returnableToken = {
            authToken : authToken,
            sessionToken : sessionToken,
            expires_at : data[0].expires_at
        }
        if(insertedSession.message == 'Erro ao Autenticar, Tente Novamente Mais Tarde'){
            return returnableToken
        }else{
            return {
                message : "Erro ao persistir sessão no banco"
            }
        }
    }

    async extendSession(req:Request,res:Response){
        const {userId,authToken} = req.body
        const {Authorization} = req.headers
        console.log(Authorization)
        return res.json(new SessionModel().renew({
            "userId" :userId,
            "sessionToken" : Authorization,
            "authToken":authToken
        }))
    }
    
}