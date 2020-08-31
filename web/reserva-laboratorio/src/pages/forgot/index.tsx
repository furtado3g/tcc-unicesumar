import React, { useState } from  'react'
import { Link } from "react-router-dom";
import './styles.css'
function ForgotPassword(){

    const [email,emailState] = useState('')

    function handleSendMail(event:any){
        const element:any = document.querySelector("#critica")
        const eventElement:any = event.target
        element.classList.toggle('hide')
        eventElement.classList.toggle('hide')
    }

    return (
        <div id="forgot-box" className="container">
            <header>
                <Link to="/">
                    Voltar
                </Link>
            </header>
            <main>
                <label htmlFor="mail">Informe Seu Email</label>
                <input 
                    type="text"
                    id="mail"
                    onChange={e=>emailState(e.target.value)}
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