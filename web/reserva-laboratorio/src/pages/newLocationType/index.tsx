import React, { useState } from "react";
import { Sidebar } from "semantic-ui-react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";

function NewLocationType() {
  
  
  const [description, descriptionState] = useState("");
  const token = localStorage.getItem("sessionToken")||'';
  const user = localStorage.getItem("userId")||'';
  
  async function handleWithSubmit() {
    const data = {
      url: "http://localhost:3333/location",
      options: {
        method: "post",
        body : JSON.stringify({description}),
        headers: {
          authorization: token,
          userId : user
        },
      },
    };
    await fetch(data.url, data.options)
    .then((response) =>{
      if(response.status === 200){
        response.json().then((json) => {

        })
      }
    })
  }

  return (
    <>
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Cadastrar Tipo de Espaço</h2>
          </div>
          <div className="row">
            <div className="col-6">
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
              <button className="btn btn-success">Salvar</button>
              <button className="btn btn-danger">Voltar</button>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}

export default NewLocationType;
