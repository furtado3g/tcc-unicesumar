import React, { useState, useEffect, memo } from "react";
import Sidebar from "../../components/sidebar"
import Panel from '../../components/panel'
import AdminPanelSidebar from '../../components/admin-panel-sidebar'
import UserTable from '../../components/user-table/'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Menu, Table } from 'semantic-ui-react'
import './styles.css'
function User() {

    const [page, pageState] = useState(0)
    const [maxPages, maxPagesState] = useState(0)
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
                response.json().then(async resData => {
                    const { numberofPages, data } = resData
                    if (data) {
                        maxPagesState(numberofPages - 1)
                        tableDataState(data)
                    }
                }).catch(err => {
                    tableDataState([])
                })
            })
            .catch(e => {
                tableDataState([])
            })
    }

    function handleNextPage() {
        pageState(page + 1)
    }

    function handlePreviousPage() {
        pageState(page - 1)
    }

    useEffect(() => {
        handleWithPageLoad()
    }, [page])

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
                        <UserTable data={tableData} >

                               
                        </UserTable>
                        <a onClick={handleNextPage}>Próximo</a>
                    </div>
                </Panel>
            </div>
        </>
    );
}

export default User