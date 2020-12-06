import React from 'react'
import Sidebar from '../../components/sidebar'
import './styles.css'
function Admin(){
    return (
        <>
            <div className="container-admin">
                <Sidebar/>
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">
                            Ola mundo
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin