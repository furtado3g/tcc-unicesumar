import React, { memo } from 'react'
import { useHistory } from 'react-router-dom';
import { Table } from 'semantic-ui-react'
function LocationTypeTable(props: any) {
    const  data = props.data
    const History = useHistory()
    
    function handleWithDetail(id: number) {
        History.push(`/locationType/${id}`)
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
                        data.map((item: any) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <button
                                            className="btn btn-light"
                                            onClick={(e) => {
                                                handleWithDetail(item.id);
                                            }}
                                        >
                                        <i className="far fa-edit"></i>
                                        Editar
                                        </button>
                                        <button className="btn btn-light">
                                                <i className="far fa-trash-alt"></i>
                                        Excluir
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    } else {
                        return (
                            <Table.Row>
                                <Table.Cell colSpan="2">Nenhum Local Cadastrado</Table.Cell>
                            </Table.Row>
                        );
                    }
                })()}
                </Table.Body>
            </Table>
        </>
    )

}

export default memo(LocationTypeTable)