import React, { useState } from  'react'
import { Link } from "react-router-dom";
import './styles.css'
function ForgotPassword(){

    const [email,emailState] = useState('')

    function showMessage(){
        const element:any = document.querySelector("#critica")
        const eventElement:any = document.querySelector('main')
        const btnElement:any = document.querySelector('.btn')
        element?.classList.toggle('hide')
        eventElement?.classList.toggle('hide')
        btnElement?.classList.toggle('hide')
    }

    async function handleSendMail(event:any){
        const data = {
            url :"http://localhost:3333/recovery",
            options : {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({"email":email})
            }
        }
        await fetch(data.url,data.options)
        .then(async response =>{
            const rjson:any= await response.json()
            alert(JSON.stringify(rjson))
            showMessage()
        })
    }

    return (
        <div id="forgot-box" className="container">
            <header>
                <Link to="/">
                    Voltar
                </Link>
            </header>
            <main>
                <label htmlFor="email">Informe Seu Email</label>
                <input 
                    type="text"
                    id="email"
                    onChange={e=>emailState(e.target.value)}
                />
            </main>
            <footer>
                <div id="critica" className="hide">
                    Enviamos um email contendo uma senha provisoria,<br/>
                    em seu proximo login efetue a troca de sua senha<br/>
                    Para Sua propria segurança
                </div>
                <button
                    type="button"
                    className="btn"
                    onClick={e => handleSendMail(e)}
                >
                    Recuperar Senha
                </button>
            </footer>
        </div>
    )
}

export default ForgotPassword