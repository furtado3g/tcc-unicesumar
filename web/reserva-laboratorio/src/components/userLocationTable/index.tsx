import React, { memo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { baseUrl } from '../../config/url.json'
import { useToasts } from 'react-toast-notifications'
import { Table,Button, Icon, Modal } from 'semantic-ui-react'

function UserLocationTable(props: any) {

    const tableData = props
    const { userId } = props
    const History = useHistory();
    const { addToast } = useToasts()
    const [modal, modalState] = React.useState(false)
    const [userLocationId, userLocationIdState] = React.useState('')
    function handleWithEdit(userLocationId: string) {
        History.push(`${baseUrl}/user/${userId}/location/${userLocationId}`)
    }

    async function handleWithDelete(userLocationId: String) {
        const data = {
            url: `${baseUrl}/location/user/${userLocationId}`,
            options: {
                method: "delete",
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
                        const { message } = data
                        addToast(message, { appearance: "success", autoDismiss: true })
                        History.go(0)
                    })
                } else {
                    response.json().then(data => {
                        const { error, message } = data
                        if (error) {
                            addToast(error, { appearance: "error", autoDismiss: true })
                        } else {
                            addToast(message, { appearance: "warning", autoDismiss: true })
                        }
                    })
                }
            })
    }

    return (
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Locais</Table.HeaderCell>
                        <Table.HeaderCell>Opções</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(() => {
                        if (tableData.tableData[0]) {
                            return tableData.tableData.map((data: any) => {
                                return (
                                    <Table.Row key={data.id}>
                                        <Table.Cell>{data.comments}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                color="black"
                                                onClick={() => {
                                                    userLocationIdState(data.id)
                                                    modalState(true)
                                                }}
                                            >
                                                <i className="fas fa-user-times margin icon"></i>
                                                Excluir
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
                {props.children}
            </Table>
            <Modal
                centered={false}
                open={modal}
                onClose={() => modalState(false)}
                onOpen={() => modalState(true)}
            >
                <Modal.Header>Excluir Espaço</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    Deseja realmente excluir o Local?
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button onClick={() => {handleWithDelete(userLocationId);modalState(false)}}>Confirmar</Button>
                <Button color="black" onClick={() => modalState(false)}>Sair</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default memo(UserLocationTable)