import React, { useState } from  'react'
import { Link } from "react-router-dom";
import './styles.css'
function ForgotPassword(){

    const [username,usernameState] = useState('')

    function showMessage(){
        const element:any = document.querySelector("#critica")
        const eventElement:any = document.querySelector('#username')
        element.classList.toggle('hide')
        eventElement.classList.toggle('hide')
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
                body : JSON.stringify({"username":username})
            }
        }
        await fetch(data.url,data.options)
        .then(response =>{
            const rjson:any= response.json()
            alert(JSON.stringify(rjson))
            showMessage()
        })
        .catch(e=>{
            alert(e)
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
                <label htmlFor="username">Informe Seu Login</label>
                <input 
                    type="text"
                    id="username"
                    onChange={e=>usernameState(e.target.value)}
                />
            </main>
            <footer>
                <div id="critica" className="hide">
                    Enviamos um email contendo uma senha provisoria,
                    em seu proximo login efetue a troca de sua senha, 
                    a validade de suasenha provisória é de 1 login
                </div>
                <button
                    type="button"
                    onClick={e => handleSendMail(e)}
                >
                    Recuperar Senha
                </button>
            </footer>
        </div>
    )
}

export default ForgotPassword