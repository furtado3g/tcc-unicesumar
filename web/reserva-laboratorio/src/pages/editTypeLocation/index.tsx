import React, {useState} from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";

function EditTypeLocation() {

  const[description, descriptionState] = useState("");

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="editTypeLocation"/>
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Editar Tipo de Espaço</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="description">Descrição</label>
              <input type="text" className="form-control" id="description" 
              onChange={(e) => descriptionState(e.target.value)}/>
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

export default EditTypeLocation;
