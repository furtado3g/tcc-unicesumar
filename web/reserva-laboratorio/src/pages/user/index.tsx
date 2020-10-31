import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar"
import Panel from '../../components/panel'
import AdminPanelSidebar from '../../components/admin-panel-sidebar'
import UserTable from '../../components/user-table/'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { ToastProvider } from 'react-toast-notifications';
import './styles.css'
import { Link } from "react-router-dom";

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
        <ToastProvider>
            <div className="container-admin">
                <Sidebar />
                <Panel title="Painel Administrativo">
                    <AdminPanelSidebar />
                    <div className="panel-content">
                        <div className="row">
                            <h2 className="page-name">Usuários Cadastrados</h2>
                        </div>
                        <UserTable data={tableData} >
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon onClick={handlePreviousPage} disabled={page === 0}>
                                                <Icon name='chevron left' />
                                            </Menu.Item>
                                            <Menu.Item as='a'>{page + 1}</Menu.Item>
                                            <Menu.Item as='a' icon onClick={handleNextPage} disabled={maxPages <= page}>
                                                <Icon name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </UserTable>
                        <div className="row text-center">
                            <Link to="/user/add">
                                <button className="btn btn-success">
                                <i className="fas fa-user-plus margin-icon"></i>
                                    Adicionar Usuário
                                </button>
                            </Link>
                        </div>
                    </div>
                </Panel>
            </div>
       
    </ToastProvider>
    );
}

export default User