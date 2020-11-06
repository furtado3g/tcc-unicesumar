import React, { useEffect, useState } from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import LocationTable from "../../components/location-table";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {Table,Menu,Icon} from 'semantic-ui-react'
import "./styles.css";

function Locations() {
    const { addToast } = useToasts();
    const [page, pageState] = useState(0)
    const [maxPages, maxPagesState] = useState(0)
    const History = useHistory();
    const token = localStorage.getItem("sessionToken") || '';
    const user = localStorage.getItem("userId") || '';
    const [tableData, tableDataState] = useState([])
    async function handleWithPageLoad() {
        const data = {
            url: `http://localhost:3333/locations?page=${page}&perPage=5`,
            options: {
                method: "GET",
                headers: {
                    authorization: token,
                    userId: user,
                },
            },
        };

        await fetch(data.url, data.options).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then((data:any) => {
                    tableDataState(data.data)
                    maxPagesState(data.numberofPages - 1)
                });
            } else {
                response.json().then((data) => {
                    const { error } = data;
                    addToast(error, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                });
            }
        }).catch(err => {
            addToast(err, {
                appearance: "error",
            });
        })
    }

    function handleWithNextPage(){
        pageState(page+1)
    }

    function handleWithPreviousPages(){
        pageState(page-1)
    }

    useEffect(() => {
        console.log(page)
        handleWithPageLoad()
    }, ['loading',page])

    return (
        <>
            <div className="container-info">
                <Sidebar />
                <Panel title="Administrador">
                    <AdminPanelSidebar />
                    <div className="panel-content">
                        <div className="row">
                            <h2 className="page-name">Espaços Cadastrados</h2>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <LocationTable data={tableData}>
                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='3'>
                                                <Menu floated='right' pagination>
                                                    <Menu.Item as='a' icon onClick={handleWithPreviousPages} disabled={page === 0}>
                                                        <Icon name='chevron left' />
                                                    </Menu.Item>
                                                    <Menu.Item as='a'>{page + 1}</Menu.Item>
                                                    <Menu.Item as='a' icon onClick={handleWithNextPage} disabled={maxPages <= page}>
                                                        <Icon name='chevron right' />
                                                    </Menu.Item>
                                                </Menu>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </LocationTable>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <button className="btn btn-primary" onClick={e => { History.push('/location/add') }}>
                                    <i className="fas fa-plus-circle margin-icon"></i>
                                    Adicionar Espaço
                                </button>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        </>
    );
}

export default Locations;
