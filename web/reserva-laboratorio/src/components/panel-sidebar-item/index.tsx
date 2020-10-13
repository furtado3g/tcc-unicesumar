import React from 'react'
import './styles.css'
function PanelSidebarItem (props: any){
    return(
        <div className="panel-sidebar-item" id={props.id}>
            {props.children}
        </div>
    )
}

export default PanelSidebarItem