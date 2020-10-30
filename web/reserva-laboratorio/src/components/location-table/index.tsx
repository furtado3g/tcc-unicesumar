import React, { memo } from "react";
import { Table } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

interface tableDataInterface {
  data: any;
}

function LocationTable({ data }: tableDataInterface) {
  const History = useHistory();

  function handleWithDetail(locationId: number) {
    History.push("/location/" + locationId);
  }
  if (data) {
    return data.forEach((item: any) => {
      return (
        <Table.Row>
          <Table.Cell>{item.comments}</Table.Cell>
          <Table.Cell>{item.type}</Table.Cell>
          <Table.Cell textAlign="right">{item.type}</Table.Cell>
          <Table.Cell textAlign="center">
            <button
              className="btn btn-light"
              onClick={(e) => {
                handleWithDetail(1);
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
      );
    });
  } else {
    return (
      <Table.Row>
        <Table.Cell colSpan="4">Nenhum Local Cadastrado</Table.Cell>
      </Table.Row>
    );
  }
}

export default memo(LocationTable);
