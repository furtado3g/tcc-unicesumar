import React from 'react'
import './styles.css'
function PanelSidebarItem (props: any){
    return(
        <div className={`panel-sidebar-item ${props.className}`} >
            {props.children}
        </div>
    )
}

export default PanelSidebarItem