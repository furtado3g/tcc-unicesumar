import React, { useState, useEffect } from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import LocationTypeTable from "../../components/locationtype-table"
import { useHistory} from "react-router-dom"
import "semantic-ui-css/semantic.min.css";
import {baseUrl} from '../../config/url.json'

function TypeLocation() {
  const History = useHistory()
  const [tableData, tableDataState] = useState([])

  async function handleWithPageLoad(){
    const data = {
      url : `${baseUrl}/location/type`,
      options : {
        method: "get",
        headers : {
          authorization : localStorage.getItem("sessionToken")||'',
          userId : localStorage.getItem("userId")||'',
        }
      }
    }
    await fetch(data.url, data.options)
    .then(response=>{
      if(response.status == 200){
        response.json().then(data=>{
          tableDataState(data)
        })
      }
    })
  }

  function handleWithAddTypeLocation(){
    History.push('/locationType/add')
  }

  useEffect(() => {
    handleWithPageLoad()
  },['loading'])

  return (
    <div className="container-admin">
      <Sidebar />
      <Panel title="Administrador">
        <AdminPanelSidebar className="typeLocation" />
        <div className="panel-content">
          <div className="row">
            <h2 className="page-name">Tipos de Espaços Cadastrados</h2>
          </div>
          <div className="row">
            <div className="col-12">
              <LocationTypeTable data={tableData} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button className="btn btn-success" onClick={handleWithAddTypeLocation}>
                <i className="fas fa-plus-circle margin-icon"></i>
                Adicionar Tipo de Espaço
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default TypeLocation;
