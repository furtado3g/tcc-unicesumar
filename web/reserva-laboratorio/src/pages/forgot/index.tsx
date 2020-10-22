import React, { useState } from 'react'
import Logo from './assets/img/logo.png'
import './styles.css'
function ForgotPassword() {

    const [email, emailState] = useState('')

    function showMessage() {
        const element: any = document.querySelector("#critica")
        const eventElement: any = document.querySelector('main')
        const btnElement: any = document.querySelector('.btn')
        element?.classList.toggle('hide')
        eventElement?.classList.toggle('hide')
        btnElement?.classList.toggle('hide')
    }

    async function handleSendMail(event: any) {
        const data = {
            url: "http://localhost:3333/recovery",
            options: {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": email })
            }
        }
        await fetch(data.url, data.options)
            .then(async response => {
                const rjson: any = await response.json()
                alert(JSON.stringify(rjson))
                showMessage()
            })
    }

    function handleWithBackButton() {
        window.location.href = '/'
    }

    return (
        <div id="forgot-box" className="container">
            <header>
                <img src={Logo} alt="Logo"/>
            </header>
            <main>
                <label htmlFor="email">Informe seu Email (Institucional)</label>
                <input
                    type="text"
                    id="email"
                    onChange={e => emailState(e.target.value)}
                />
            </main>
            <footer>
                <div id="critica" className="hide">
                    Enviamos um email com sua senha provisória,<br />
                    para sua própria segurança, em seu próximo acesso efetue a alteração de senha!<br />
                </div>
                <div className="button-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={handleWithBackButton}
                    >
                        Voltar
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={e => handleSendMail(e)}
                    >
                        Recuperar Senha
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default ForgotPassword