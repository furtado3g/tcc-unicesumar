import React from "react";
import Panel from "../../components/panel";
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router-dom";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
function EditLocation() {
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="editLocation"/>
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Cadastrar Espaço</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <label htmlFor="userType">Tipo de Localização</label>
              <select className="form-control" id="typeLocation">
                <option value="">Selecione</option>
                <option value="1">Laboratório</option>
                <option value="2">Auditório</option>
                <option value="3">Sala de Reunião</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="description">Descricao</label>
              <input type="text" className="form-control" id="description" />
            </div>
            <div className="col-6">
              <label htmlFor="capacity">Capacidade</label>
              <input type="text" className="form-control" id="capacity" />
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

export default EditLocation;
