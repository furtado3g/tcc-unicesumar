import React,{useState}from "react";
import { Link } from "react-router-dom";
import logo from './assets/img/logo.png'
import "./styles.css";
import { useToasts } from 'react-toast-notifications'
import {useHistory} from 'react-router-dom'

function Login() {
  
  const [username, usernameState] = useState('');
  const [password, passwordState] = useState('');
  const [error, errorState] = useState('');
  const { addToast } = useToasts()
  const History = useHistory();

  function handleWithAlert(){
    document.querySelector(".alert")?.classList.toggle('hidden')
  }

  function handleUsernameChange(e:any){
    const value:string = e.target.value
    usernameState(value)
  }

  function handlePasswordChange(e:any){
    const value:string = e.target.value
    passwordState(value)
  }

  async function handleLoginForm(){
    const data = {
      url : "http://localhost:3333/session",
      options:{
        method : "post",
        body : JSON.stringify({username,password}),
        headers:{
          'Content-Type' : 'application/json'
        }
      }
    }
    await fetch(data.url,data.options)
    .then(async (data)=>{
      if(data.status === 200){
        const {message,auth,token} = await data.json()
        const{authToken,sessionToken,expires_at} = token 
        handleWithInsertLocalStorage({auth,authToken,sessionToken,expires_at})
        if(!auth||auth !== null){
          History.push('/home')
        }
      }else{
        const {message} = await data.json()
        errorState(message)
        handleWithAlert()
      }

    })
    .catch(e=>{
      addToast(e,{appearance:'warning', autoDismiss: true})
    })
  }

  function handleWithInsertLocalStorage(json:any){
    Object.keys(json).map((key)=>{
      if(key === 'auth'){
        localStorage.setItem('userId',json[key])
      }else{
        localStorage.setItem(key,json[key])
      }
    })
  }

  return (
    <div id="login_box" className="container">
      <header className="logo-container">
      <img alt="logo of project" src={logo}/>
      </header>
      <main>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            className="form-control"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login">Senha</label>
          <input
            type="password"
            id="login"
            className="form-control"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="alert hidden">
          {error}
        </div>
      </main>
      <div id="footer">
        <button 
          type="button" 
          className="btn btn-login"
          onClick={ handleLoginForm }
        >
          Entrar
        </button>
        < Link
          to="/forgot" 
          className="btn btn-forgot"
        >
          Recuperar senha
        </Link>
      </div>
    </div>
  );
}

export default Login;
