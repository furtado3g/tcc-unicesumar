import React from "react";

import "./styles.css";
function Login() {
  const logo = "";

  // const [login, loginState] = useState();

  return (
    <div id="login_box" className="container">
      <header className="logo-container">
        <img src={logo} alt="computer logo" />
        <p>ReserLab</p>
      </header>
      <main>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            className="form-control"
            placeholder="login"
            //onKeyUp={e=>loginState()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login">Senha</label>
          <input
            type="password"
            id="login"
            className="form-control"
            placeholder="senha"
          />
        </div>
      </main>
      <footer>
        <button type="button" className="btn btn-login">
          Entrar
        </button>
      </footer>
    </div>
  );
}

export default Login;
