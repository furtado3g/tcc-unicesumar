import React, { memo } from 'react'
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Table } from 'semantic-ui-react'
import { baseUrl } from '../../config/url.json'
import { Button, Icon, Modal } from 'semantic-ui-react'

function LocationTypeTable(props: any) {

    const data = props.data
    const History = useHistory()
    const { addToast } = useToasts()
    const [modal, modalState] = React.useState(false)
    const [locationType, locationTypeState] = React.useState('')

    async function handleWithEdit(id: string) {
        History.push(`/locationType/${id}`)
    }

    async function handleWithDelete(id: string) {
        const data = {
            url: `${baseUrl}/location/type/${id}`,
            options: {
                method: "delete",
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
                        const { message } = data
                        addToast(message, { appearance: "success", autoDismiss: true, })
                        History.go(0)
                    }
                    ).catch(err => {
                        addToast("Erro ao Processar Requisição", { appearance: "error", autoDismiss: true, })
                    })
                } else {
                    response.json().then(data => {
                        const { error, message } = data
                        if (message) {
                            addToast("Erro ao Processar Requisição", { appearance: "warning", autoDismiss: true, })
                        } else if (error) {
                            addToast(error, { appearance: "error", autoDismiss: true, })
                        }
                    }).catch(err => {
                        addToast("Erro ao Processar Requisição", { appearance: "error", autoDismiss: true, })
                    })
                }
            })
    }

    return (
        <>
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Opções</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(() => {
                        if (data[0]) {

                            return data.map((item: any) => {
                                return (
                                    <Table.Row key={item.id}>
                                        <Table.Cell>{item.description}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <button className="btn btn-light" onClick={e => handleWithEdit(item.id)}>
                                                <i className="far fa-edit margin-icon"></i>
                                            Editar
                                        </button>
                                            <button className="btn btn-light" onClick={e => {locationTypeState(item.id);modalState(true)}}>
                                                <i className="far fa-trash-alt margin-icon"></i>
                                            Excluir
                                        </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        } else {
                            return (
                                <Table.Row>
                                    <Table.Cell colSpan="2">Nenhum Espaço Cadastrado</Table.Cell>
                                </Table.Row>
                            );
                        }
                    })()}
                </Table.Body>
                {props.children}
            </Table>
            <Modal
                centered={false}
                open={modal}
                onClose={() => modalState(false)}
                onOpen={() => modalState(true)}
            >
                <Modal.Header>Excluir Tipo Espaço</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Deseja realmente excluir o tipo de Local?
          </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => {handleWithDelete(locationType);modalState(false)}}>Confirmar</Button>
                    <Button color="black" onClick={() => modalState(false)}>Sair</Button>
                </Modal.Actions>
            </Modal>
        </>
    )

}

export default memo(LocationTypeTable)