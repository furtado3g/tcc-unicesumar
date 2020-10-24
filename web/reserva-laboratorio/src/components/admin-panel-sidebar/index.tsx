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
            <Link to="/users/">
              <i className="fas fa-users"></i>
              Usuários
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