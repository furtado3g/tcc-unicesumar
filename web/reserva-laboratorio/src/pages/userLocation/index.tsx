import React from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";

function UserLocation() {

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="userLocation"/>
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Usuário por Espaço</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="userType">ID Usuário</label>
              <select className="form-control" id="typeLocation">
                <option value="">Selecione</option>
                <option value="1">Teste 1</option>
                <option value="2">Teste 2</option>
                <option value="3">Teste 3</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="userType">ID Localização</label>
              <select className="form-control" id="typeLocation">
                <option value="">Selecione</option>
                <option value="1">Teste 1</option>
                <option value="2">Teste 2</option>
                <option value="3">Teste 3</option>
              </select>
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
    </div>
  );
}
export default UserLocation;
