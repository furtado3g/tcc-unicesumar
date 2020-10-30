import React, { useEffect , useState} from "react";
import AdminPanelSidebar from "../../components/admin-panel-sidebar";
import Panel from "../../components/panel";
import Sidebar from "../../components/sidebar";
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import LocationTable from "../../components/location-table";
import { useToasts } from "react-toast-notifications";
import { useHistory} from "react-router-dom";

function Locations() {
    const { addToast } = useToasts();
    const [pageNumber,pageNumberState] = useState('')
    const History = useHistory();
    const token = localStorage.getItem("sessionToken")||'';
    const user = localStorage.getItem("userId")||'';
    let tableData : any 
    async function handleWithPageLoad() {
        const data = {
            url: "http://localhost:3333/locations",
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
                response.json().then((data) => { 
                  tableData = data.data
                  pageNumberState(data.numberofPages)
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

    useEffect(() => {
        handleWithPageLoad()
    }, ['loading'])

    return (
        <>
            <div className="container-info">
                <Sidebar />
                <Panel title="Administrador">
                    <AdminPanelSidebar />
                    <div className="panel-content">
                        <div className="row">
                            <h2 className="page-name">Locais</h2>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Table celled inverted selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Tipo</Table.HeaderCell>
                                            <Table.HeaderCell>Capacidade</Table.HeaderCell>
                                            <Table.HeaderCell>Opções</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <LocationTable data={tableData} />
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <button className="btn btn-primary" onClick={e=>{History.push('/location/add')}}>
                                    <i className="fas fa-plus-circle"></i>
                                    Adicionar Local
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
