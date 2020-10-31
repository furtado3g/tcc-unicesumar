import React from 'react'
import './styles.css'

function PanelSidebar(props:any){
    return (
        <div className="panel-sidebar">
            {props.children}
        </div>
    )
}

export default PanelSidebar