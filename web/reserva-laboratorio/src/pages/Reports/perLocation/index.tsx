import React, { useState, useEffect } from "react";
import Panel from "../../../components/panel";
import Sidebar from "../../../components/sidebar/index";
import ReportsSidebar from '../../../components/reports-sidebar'
import MUIDataTable from "mui-datatables";
import { baseUrl } from '../../../config/url.json'
import { Table, Menu, Icon, Button, Modal } from 'semantic-ui-react'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR'
import { useToasts } from 'react-toast-notifications'
function PerLocation() {
    const [page, pageState] = useState(0)
    const [maxPages, maxPagesState] = useState(0)
    const [tableData, tableDataState] = useState([])
    const [modal, modalState] = React.useState(false)
    const [reserves, reservesState] = React.useState([])
    const [startPeriod, startPeriodState] = React.useState(moment().subtract(1, 'M'))
    const [endPeriod, endPeriodState] = React.useState(moment())
    const [locationId, locationIdState] = React.useState('')
    const token = localStorage.getItem("sessionToken") || ''
    const user = localStorage.getItem("userId") || ''
    const { addToast } = useToasts()
    const columns = [
        { name: "userName", label: "Colaborador", options: { filter: true, sort: false, } },
        { name: "class", label: "Turma", options: { filter: true, sort: false, } },
        { name: "discipline", label: "Disciplina", options: { filter: true, sort: false, } },
        { name: "date", label: "Data", options: { filter: true, sort: false, } },
        { name: "start", label: "Inicio", options: { filter: true, sort: false, } },
        { name: "end", label: "Termino", options: { filter: true, sort: false, } },
    ];
    async function handleWithPageLoad() {
        const data = {
            url: `${baseUrl}/locations?page=${page}&perPage=5`,
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
                response.json().then((data: any) => {
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

    async function handleWithModalOpen(id: string) {
        const data = {
            url: `${baseUrl}/reports/location/${id}?begin=${startPeriod.format('DD/MM/YYYY')}&end=${endPeriod.format('DD/MM/YYYY')}`,
            options: {
                method: "get",
                headers: {
                    authorization: localStorage.getItem("sessionToken") || '',
                    userId: localStorage.getItem("userId") || '',
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        reservesState(() => {
                            return data.map((item: any) => {
                                return {
                                    "userName": item.userName,
                                    "date": moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                                    "start": item.start,
                                    "end": item.end,
                                    "class": item.class,
                                    "discipline": item.discipline,

                                }
                            })
                        })
                    })
                } else {
                    reservesState([])
                }
            }).catch(e => {
                console.log(e)
                reservesState([])
            })
    }

    function handleNextPage() {
        pageState(page + 1)
    }

    function handlePreviousPage() {
        pageState(page - 1)
    }

    React.useEffect(() => {
        handleWithPageLoad()
    }, [page])

    React.useEffect(() => {
        handleWithModalOpen(locationId)
    }, [modal])

    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Relatórios">
                <ReportsSidebar/>
                <div className="panel-content">
                    <div className="row">
                        <h2 className="page-name">Locais</h2>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="begin">Inicio</label>
                            <DatePicker
                                format="DD/MM/YYYY"
                                className="form-control"
                                locale={locale}
                                id="begin"
                                value={startPeriod}
                                onChange={(date: any) => startPeriodState(date)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="end">Termino</label>
                            <DatePicker
                                format="DD/MM/YYYY"
                                className="form-control"
                                locale={locale}
                                id="end"
                                value={endPeriod}
                                onChange={(date: any) => endPeriodState(date)}
                            />
                        </div>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>Capacidade</Table.HeaderCell>
                                <Table.HeaderCell>Opções</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {(() => {
                                if (tableData[0]) {
                                    return tableData.map((item: any) => {
                                        return (
                                            <Table.Row key={item.id}>
                                                <Table.Cell>{item.comments}</Table.Cell>
                                                <Table.Cell>{item.ds_location_type}</Table.Cell>
                                                <Table.Cell textAlign="right">{item.capacity}</Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Button color="grey" onClick={() => { locationIdState(item.id); modalState(true) }}>
                                                        <i className="far fa-eye margin-icon"></i>
                                                        Exibir
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    });
                                }
                                return (
                                    <Table.Row>
                                        <Table.Cell>Nenhum usuário encontrado</Table.Cell>
                                    </Table.Row>
                                );
                            })()}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
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
                    </Table>
                </div>
            </Panel>
            <Modal
                centered={false}
                open={modal}
                size='small'
                onClose={() => modalState(false)}
                onOpen={() => modalState(true)}
            >
                <Modal.Content>
                    <Modal.Description>
                        <div className="row">
                            <div className="col-12">
                                <MUIDataTable
                                    title={"Reservas por local e periodo"}
                                    data={reserves}
                                    columns={columns}
                                    options={{
                                        filter: true,
                                        filterType: "dropdown",
                                    }}
                                />
                            </div>
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => modalState(false)}>Sair</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
export default PerLocation;
