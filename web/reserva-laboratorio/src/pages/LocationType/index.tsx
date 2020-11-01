import React from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import LocationTypeTable from "../../components/locationtype-table"
import "semantic-ui-css/semantic.min.css";
function TypeLocation() {
  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="typeLocation" />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Tipos de Espaço</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <LocationTypeTable data={[{"description":"ola mundo",'id':'1'},{"description":"ola mundo",'id':'1'},{"description":"ola mundo",'id':'1'},]} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-success">
                <i className="fas fa-user-plus margin-icon"></i>
                Adicionar Tipo de Localização
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default TypeLocation;
