import React, { useState, useEffect } from "react";
import Panel from "../../../components/panel";
import Sidebar from "../../../components/sidebar/index";
import ReportsSidebar from '../../../components/reports-sidebar'
import MUIDataTable from "mui-datatables";
import { baseUrl } from '../../../config/url.json'
import { Button, Modal } from 'semantic-ui-react'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR'
import { useToasts } from 'react-toast-notifications'
function PerPeriod() {
    const [modal, modalState] = React.useState(false)
    const [reserves, reservesState] = React.useState([])
    const [startPeriod, startPeriodState] = React.useState(moment().subtract(1, 'M'))
    const [endPeriod, endPeriodState] = React.useState(moment())
    const columns = [
        { name: "userName", label: "Colaborador", options: { filter: true, sort: false, } },
        { name: "localName", label: "Local", options: { filter: true, sort: false, } },
        { name: "class", label: "Turma", options: { filter: true, sort: false, } },
        { name: "discipline", label: "Disciplina", options: { filter: true, sort: false, } },
        { name: "date", label: "Data", options: { filter: true, sort: false, } },
        { name: "start", label: "Inicio", options: { filter: true, sort: false, } },
        { name: "end", label: "Termino", options: { filter: true, sort: false, } },
    ];

    async function handleWithModalOpen() {
        const data = {
            url: `${baseUrl}/reports/period?begin=${startPeriod.format('DD/MM/YYYY')}&end=${endPeriod.format('DD/MM/YYYY')}`,
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
                                    "localName": item.localName,
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

    React.useEffect(() => {
        handleWithModalOpen()
    }, [modal])

    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Relatórios">
                <ReportsSidebar />
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
                    <div className="row">
                        <div className="col-12 text-center">
                            <Button color="grey" onClick={() => { modalState(true) }}>
                                <i className="far fa-eye margin-icon"></i>
                                Exibir
                            </Button>
                        </div>
                    </div>
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
export default PerPeriod;
