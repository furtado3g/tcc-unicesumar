import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import { baseUrl } from '../../config/url.json'
import {Button} from 'semantic-ui-react'
import Sidebar from '../../components/sidebar'
import Panel from '../../components/panel'
import AdminPanelSidebar from '../../components/admin-panel-sidebar'
import UserLocationTable from '../../components/userLocationTable'
function UserLocations() {
    const sessionToken = localStorage.getItem("sessionToken") || '';
    const user = localStorage.getItem("userId") || '';
    const { id }: any = useParams();
    const { addToast } = useToasts()
    const History = useHistory()
    const [tableData, tableDataState] = useState([])

    async function handleWithPageLoad() {
        const data = {
            url: `${baseUrl}/location/user/${id}`,
            options: {
                method: "get",
                headers: {
                    authorization: sessionToken,
                    userId: user
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        tableDataState(data)
                    })
                } else if (response.status >= 300) {
                    response.json().then(data => {
                        const { error, message } = data
                        if (error) {
                            addToast(error, { appearance: 'error', autoDismiss: true })
                        } else {
                            addToast(message, { appearance: 'warning', autoDismiss: true })
                        }
                    })

                }
            })
    }

    function handleWithAssignNewLocal(locationId:string){
        History.push(`/user/${id}/location/${locationId}`)
    }


    useEffect(() => {
        handleWithPageLoad()
    }, ['loading'])

    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Administrador">
                <AdminPanelSidebar className="editTypeLocation" />
                <div className="panel-content">
                    <div className="row">
                        <div className="col-12">
                            <UserLocationTable tableData={tableData} userId={id}></UserLocationTable>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Button color="black" onClick={() =>{handleWithAssignNewLocal('')}}>
                                <i className="fas fa-plus-circle margin-icon"></i>
                                Atribuir Espaço
                            </Button>
                        </div>
                    </div>

                </div>
            </Panel>
        </div>
    )
}

export default UserLocations