import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar'
import './styles.css'
function Admin(){

    const [loggedUsername, loggedUsernameState] = useState('')
    const [name, nameState] = useState('')
    const [username, usernameState] = useState('')
    const [password, passwordState] = useState('')
    const [redundacy, redundacyState] = useState('')
    const [email, emailState] = useState('')
    const [userType, userTypeState] = useState('')


    async function handleWithPageLoad(){
        const requestData = {
            url : 'http://localhost:3333/user/'+localStorage.getItem('user_id'),
            options : {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        }
        await fetch(requestData.url,requestData.options)
        .then(data =>{
          return data.json()  
        })
        .then((data:any) =>{
            const { name } = data 
            loggedUsernameState(name)
        })
        .catch(e=>{
            loggedUsernameState("Admin")
        })
    }

    function handleWithSubmit(){
        const data = {
            url : "http://localhost:3333/user/",
            options : {
                method : "post",
                body : JSON.stringify({
                    username,
                    password,
                    email,
                    userType
                })
            }
        }
        if(password !== redundacy){
            alert('Senhas Não Coincidem')
        }
    }

    useState(handleWithPageLoad())

    return (
        <>
            <div className="container-admin">
                <Sidebar/>
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">
                            {loggedUsername}
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="panel-sidebar">
                            <div className="panel-sidebar-item">
                                Novo Usuario
                            </div>
                        </div>
                        <div className="panel-content">
                            <div className="row">
                                <h2 className="page-name">
                                    Novo Usuario
                                </h2>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="name">Nome</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        onChange={e=>nameState(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="userName">Login</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        onChange={e=>usernameState(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        onChange={e=>emailState(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="password">Senha</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        onChange={e=>passwordState(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="c_password">Confirmar Senha</label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="c_password"
                                        onChange={e=>redundacyState(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <select 
                                        className="form-control" 
                                        id="userType"
                                        onChange={e=>userTypeState(e.target.value)}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="1">Coordenador</option>
                                        <option value="2">Professor</option>
                                        <option value="3">Laboratorista</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center" >
                                    <button
                                        className="btn btn-success"
                                        onClick={handleWithSubmit}
                                    >
                                        Salvar Usuario
                                    </button>
                                    <Link 
                                        to="/admin"
                                    >
                                        
                                        <button
                                            className="btn btn-danger"
                                        >
                                        Voltar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin