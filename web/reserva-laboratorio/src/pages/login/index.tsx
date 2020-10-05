import React,{useState}from "react";
import { Link } from "react-router-dom";
import logo from './assets/img/logo.png'
import "./styles.css";
function Login() {
  
  const [login, loginState] = useState('');
  const [password, passwordState] = useState('');
  

  function handleUsernameChange(e:any){
    const value:string = e.target.value
    loginState(value)
  }

  function handlePasswordChange(e:any){
    const value:string = e.target.value
    passwordState(value)
  }

  function handleLoginForm(){
    const data = {
      url : "localhost:3333/session",
      options:{
        method : "post",
        body : {login,password}
      }
    }
    
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
      </main>
      <footer>
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
          Esqueci minha senha
        </Link>
      </footer>
    </div>
  );
}

export default Login;
