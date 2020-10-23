import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar"
import Panel from '../../components/panel'
import AdminPanelSidebar from '../../components/admin-panel-sidebar'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Menu, Table } from 'semantic-ui-react'
import './styles.css'
function User() {

    const [page, pageState] = useState(1)
    const token = localStorage.getItem("sessionToken") || ''
    const user = localStorage.getItem("userId") || ''
    const [tableData, tableDataState] = useState([])

    async function handleWithPageLoad() {
        const data = {
            url: "http://localhost:3333/users?page=" + page + "&perPage=5",
            options: {
                method: "get",
                headers: {
                    authorization: token,
                    userId: user
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                response.json().then(async data => {
                    tableDataState(data)
                    data.map((data: any) => {
                        console.log(data)
                    })
                })
            })
    }

    function handleNextPage() {
        pageState(page + 1)
    }

    useEffect(() => {
        handleWithPageLoad()
    }, ['loading', page])

    return (
        <>
            <div className="container-admin">
                <Sidebar />
                <Panel title="Painel Administrativo">
                    <AdminPanelSidebar />
                    <div className="panel-content">
                        <div className="row">
                            <h2 className="page-name">Usuários</h2>
                        </div>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Usuario</Table.HeaderCell>
                                    <Table.HeaderCell>Opções</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {() => {
                                    if (tableData[0] !== null) {
                                        tableData.map((data: any) => {
                                            console.log(data)
                                            return (
                                                <Table.Row>
                                                    <Table.Cell>{data.name}</Table.Cell>
                                                    <Table.Cell>Cell</Table.Cell>
                                                </Table.Row>
                                            )

                                        })
                                    }else{
                                        return(
                                            <Table.Cell rowSpan='2'>Nenhum Usuario Encontado</Table.Cell>
                                        )
                                    }
                                }}
                            </Table.Body>
                        </Table>
                        <a onClick={handleNextPage}>Proximo</a>
                    </div>
                </Panel>
            </div>
        </>
    );
}

export default User