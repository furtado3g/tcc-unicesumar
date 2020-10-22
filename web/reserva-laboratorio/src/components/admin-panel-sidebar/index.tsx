import React, { useEffect } from 'react';
import PanelSidebar from "../../components/panel-sidebar";
import PanelSidebarItem from "../../components/panel-sidebar-item";
import {Link}  from 'react-router-dom'
function AdminPanelSidebar(props:any) {
    
    const activePage = props.activePage;

    function handleWithLoadingComponent(){
        document.querySelector('.'+activePage)?.classList.add('active')
    }

    useEffect(() => {
        handleWithLoadingComponent()
    },['loading'])

    return(
        <PanelSidebar>
          <PanelSidebarItem className="newUser">
            <Link to="/user/add">
              <i className="fas fa-user-plus"></i>
              Novo Usuário
            </Link>
          </PanelSidebarItem>
          <PanelSidebarItem className="editUser">
            <Link to="/user/edit">
              <i className="fas fa-user-edit"></i>
              Editar Usuário
            </Link>
          </PanelSidebarItem>
          <PanelSidebarItem className="newLocation">
            <Link to="/location/add">
              <i className="fas fa-map-marker-alt"></i>
              Cadastrar Espaço
            </Link>
          </PanelSidebarItem>
          <PanelSidebarItem className="editLocation">
            <Link to="/location/edit">
              <i className="fas fa-pen-square"></i>
              Editar Espaço
            </Link>
          </PanelSidebarItem>
        </PanelSidebar>
    )
}

export default AdminPanelSidebar;