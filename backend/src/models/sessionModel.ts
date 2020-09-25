import db from "../database/connection";

interface authTokens {
  userId: string;
  authToken: any;
  sessionToken: any;
}

interface responseObject {
  message: string;
  token : any
}

export default class SessionModel {
  /*
    Saves section and user tokens to verify that the section is valid
  */

  async create(userToken: authTokens) {
    let response:responseObject = {
      message: "Sessão Autenicada Com Sucesso",
      token : {},
    };
    console.log(userToken)
    const insertedSession = await db("sessions").insert({
      "user_id":userToken.userId,
      "auth_token":userToken.authToken,
      "session_token":userToken.sessionToken,
    })
    .then(data=>{
      response.token = data
    }).catch(e=>{
      response.message = "Erro ao Autenticar, Tente Novamente Mais Tarde"
    })
    return response;
  }

  async renew(userToken: authTokens) {
    let returnable
    const sql = "update sessions"+
                "set expires_at = expires_at + '5 minutes'::interval "+
                "where user_id = "+userToken.userId+" "+
                "and session_token = '"+userToken.sessionToken+"' "+
                "and datetime('localtime') between access_at and expires_at"
    const updatedSession = await db.raw(sql)
    .then(data=>{
      returnable = {status:"updated"}
    })
    //.catch(e=>{
    //  returnable = {status:e}
    //})
    return returnable
  }

  async verify(userToken: authTokens) {
    let response: responseObject = {
      message: "Sessão Autenicada Com Sucesso",
      token : {}
    };
    let is_valid: boolean
    const session = await db("sessions")
    .whereRaw("`sessions`.`username` = ?", userToken.userId)
    .whereRaw("`sessions`.`auth_token` = ?", userToken.authToken)
    .whereRaw("`sessions`.`session_token` = ?", userToken.sessionToken)
    .whereRaw("datetime('now','localtime') between `sessions`.`access_at` and `sessions`.`expires_at`")
    .then(data=>{
      response.message = "Sessão Valida"
    }).catch(e=>{
      response.message = "Sessão Invalida"
    })
    return response;
  }
}
