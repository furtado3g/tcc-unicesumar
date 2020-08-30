import React from  'react'
import { Link } from "react-router-dom";
import './styles.css'
function forgotPassword(){
    return (
        <div id="forgot-box" className="container">
            <header>
                <Link to="/">
                    Voltar
                </Link>
                <h3>Esqueci minha senha</h3>
            </header>
            <main>
                <label htmlFor="mail">Informe Seu Email</label>
                <input 
                    type="text"
                    id="mail"
                    onChange={e=>console.log('checked')}
                />
            </main>
            <footer>
                <div id="critica">
                    Enviamos um email contendo uma senha provisoriabr
                    Em seu porximo login efetue a troca do mesmo
                </div>
                <button
                    type="button"
                >
                    Recuperar Senha
                </button>
            </footer>
        </div>
    )
}

export default forgotPassword