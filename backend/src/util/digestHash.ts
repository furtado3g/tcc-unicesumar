import crypto from "crypto";

export default function(password:string){
    const salt = "SistemaDeGerenciamento"
    return crypto.createHash("sha512").update(password+salt).digest("hex"); 
}