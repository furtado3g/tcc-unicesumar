import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { baseUrl } from '../../config/url.json'
import { DatePicker, TimePicker } from 'antd'
import { Button } from 'semantic-ui-react'
import locale from 'antd/es/date-picker/locale/pt_BR'
import 'moment/locale/pt-br';
import moment from 'moment'
import Sidebar from '../../components/sidebar'
import Panel from '../../components/panel'
import PanelSidebar from '../../components/panel-sidebar'
import PanelSidebarItem from '../../components/panel-sidebar-item'
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css'

function EditReserve() {

    const { addToast } = useToasts();
    const History = useHistory()
    const { id }: any = useParams()
    const [locations, locationsState] = React.useState([])
    const [comments, commentsState] = React.useState('')
    const [startDate, startDateState] = React.useState(moment())
    const [classes, classesState] = React.useState('')
    const [discipline, disciplineState] = React.useState('')
    const [location, locationState] = React.useState('')
    const [startTime, startTimeState] = React.useState(moment())
    const [endTime, endTimeState] = React.useState(moment())
    const [userId, userIdState] = React.useState()

    const dateFormat = 'DD/MM/YYYY'
    const format = 'HH:mm'
    async function getDetailOfReserve() {
        const data = {
            url: `${baseUrl}/reserve/${id}`,
            options: {
                method: "get",
                headers: {
                    authorization: localStorage.getItem("sessionToken") || '',
                    userid: localStorage.getItem("userId") || ''
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        console.log(JSON.stringify(data))
                        commentsState(data[0].comments)
                        startDateState(moment(data[0].date,'YYYY-MM-DD'))
                        classesState(data[0].class)
                        disciplineState(data[0].discipline)
                        locationState(data[0].location_id)
                        startTimeState(moment(data[0].time_start,format))
                        endTimeState(moment(data[0].time_end,format))
                        userIdState(data[0].teacher_id)
                    })
                } else {
                    response.json().then(data => {
                        const { message, error } = data
                        if (error && !message) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: 'warning', autoDismiss: true })
                        }
                    })
                }
            })
    }

    async function getLocationList() {
        const data = {
            url: `${baseUrl}/locations`,
            options: {
                method: "get",
                headers: {
                    authorization: localStorage.getItem("sessionToken") || '',
                    userid: localStorage.getItem("userid") || '',
                }
            }
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        locationsState(data.data)
                    })
                } else {
                    response.json().then(data => {
                        const { error, message } = data
                        if (error && !message) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: 'warning', autoDismiss: true })
                        }
                    })
                }
            })
    }

    async function handleWithSubmit() {
        const data = {
            url: `${baseUrl}/reserve/${id}`,
            options: {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem("sessionToken") || '',
                    userid: localStorage.getItem("userId") || '',
                },
                body: JSON.stringify({
                    userId: userId,
                    locationId: location,
                    date: moment(startDate).add(3,'h'),
                    time_start: startTime.format(format),
                    time_end: endTime.format(format),
                    classes: classes,
                    discipline: discipline,
                    comments: comments,
                })
            },
        }
        await fetch(data.url, data.options)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        const { message, error } = data
                        if (error && !message) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: 'success', autoDismiss: true })
                            History.go(-1)
                        }
                    })
                } else {
                    response.json().then(data => {
                        const { message, error } = data
                        if (error && !message) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: 'warning', autoDismiss: true })
                        }
                    })
                }
            })
    }

    function handleWithReturn() {
        History.go(-1)
    }

    function disabledDate(current : any) {
        const start = moment().add(1,'M');
        return !(start.isSameOrBefore(current));
    }

    React.useEffect(() => {
        getLocationList()
        getDetailOfReserve()
    }, ['loading'])

    return (
        <div className="container-admin">
            <Sidebar />
            <Panel title="Reservas">
                <PanelSidebar>
                    <PanelSidebarItem >
                        <a onClick={handleWithReturn}>
                            <i className="fas fa-chevron-circle-left margin-icon"></i> Voltar
                </a>
                    </PanelSidebarItem>
                </PanelSidebar>
                <div className="panel-content">
                    <div className="row">
                        <h2 className="page-name">Editar Reserva</h2>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="class">Turma</label>
                            <input
                                type="text"
                                className="form-control"
                                id="class"
                                value={classes}
                                onChange={e => classesState(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="discipline">Disciplina</label>
                            <input
                                type="text"
                                className="form-control"
                                id="discipline"
                                value={discipline}
                                onChange={e => disciplineState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="locations">Local da Reserva</label>
                            <select
                                id="locations"
                                className="form-control"
                                onChange={e => locationState(e.target.value)}
                                value={location}
                            >
                                <option value="">Selecione</option>
                                {(() => {
                                    if (locations[0]) {
                                        return locations.map((location: any) => {
                                            return (
                                                <option value={location.id} key={location.id}>{location.comments}</option>
                                            )
                                        })
                                    }
                                })()}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="data">Data da Reserva</label>
                            <DatePicker
                                className="form-control"
                                locale={locale}
                                format={dateFormat}
                                disabledDate={disabledDate}
                                onChange={(date: any) => { startDateState(date) }}
                                value={startDate}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="data">Inicio</label>
                            <TimePicker
                                className="form-control"
                                value={moment(startTime,format)}
                                format={format}
                                onChange={(data: any)=>startTimeState(data)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="data">Termino</label>
                            <TimePicker
                                className="form-control"
                                value={moment(endTime,format)}
                                format={format}
                                onChange={(data: any)=>endTimeState(data)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea
                                className="form-control"
                                id="userName"
                                value={comments}
                                onChange={e => commentsState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Button color="black" onClick={handleWithSubmit}>
                                <i className="fas fa-save margin-icon"></i>
                                Salvar Reserva
                            </Button>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default EditReserve