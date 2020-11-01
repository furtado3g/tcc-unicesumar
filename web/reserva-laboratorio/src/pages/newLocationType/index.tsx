import React, { useState } from "react";
import { Sidebar } from "semantic-ui-react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import { useToasts } from 'react-toast-notifications'
import { useHistory } from "react-router-dom";

function NewLocationType() {
<<<<<<< HEAD
  
=======
>>>>>>> 7d6712aa476c9869983557f5188550170d3051f9
  const [description, descriptionState] = useState("");
  const token = localStorage.getItem("sessionToken") || '';
  const user = localStorage.getItem("userId") || '';
  const { addToast } = useToasts()
  const History = useHistory()

  async function handleWithSubmit() {

    const data = {
      url: "http://localhost:3333/location/type",
      options: {
        method: "post",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          userId: user
        },
      },
    };
    await fetch(data.url, data.options)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            const { message, error } = json
            if (error) {
              addToast(error, { appearance: "error", autoDismiss: true })
            } else if (message) {
              addToast(message, { appearance: "success", autoDismiss: true })
              History.push('/locationTypes')
            }
          })
        }else{
          response.json().then((data)=>{
            const { message, error } = data
            if (error) {
              addToast(error, { appearance: "error", autoDismiss: true })
            } else if (message) {
              addToast(message, { appearance: "warning", autoDismiss: true })
            }
          })
        }
      })
  }

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Cadastrar Tipo de Espaço</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="description">Denominação do Espaço</label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={(e) => descriptionState(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-success" onClick={handleWithSubmit}>Salvar</button>
              <button className="btn btn-danger">Voltar</button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default NewLocationType;
