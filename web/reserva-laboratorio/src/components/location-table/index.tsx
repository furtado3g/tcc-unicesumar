import React, { memo } from "react";
import { Table } from "semantic-ui-react";
import { useHistory } from 'react-router-dom'
import user from "../../pages/user";
function LocationTable({ }) {
    
    const History = useHistory()
    
    function handleWithDetail(locationId: number) {
        History.push('/location/' + locationId)
    }

    return (
        <>
            <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell textAlign="right">None</Table.Cell>
                <Table.Cell textAlign="center">
                    <button
                        className="btn btn-light"
                        onClick={e=>{handleWithDetail(1)}}
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
        </>
    );
}

export default memo(LocationTable);
