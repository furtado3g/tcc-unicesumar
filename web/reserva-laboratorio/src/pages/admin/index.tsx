import React, { useState } from 'react'
import Sidebar from '../../components/sidebar'
import './styles.css'
function Admin(){

    const [username, usernameState] = useState('')

    async function handleWithPageLoad(){
        const requestData = {
            url : 'http://localhost:3333/user/'+localStorage.getItem('user_id'),
            options : {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        }
        const request = await fetch(requestData.url,requestData.options)
        if(request.status === 200) {
            const response = await request.json()
            const { name } = response 
            usernameState(name)
        }else{
            usernameState('Administrador')
        }
    }

    useState(handleWithPageLoad())

    return (
        <>
            <div className="container-admin">
                <Sidebar/>
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title">
                            {username}
                        </div>
                    </div>
                    <div className="panel-body">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin