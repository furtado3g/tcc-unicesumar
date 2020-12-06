import db from "../database/connection";

interface ILocation {
  type: string;
  comments: string;
  capacity: number;
}

class LocationModel {
  async insert(location: ILocation) {
    let returnable;
    const insertedRows = await db("locations")
      .insert(location)
      .then((data) => {
        returnable = { message: "Espaço cadastrado com sucesso" };
      })
      .catch((err) => {
        returnable = { error: "Erro ao excluir espaço" };
      });
    return returnable;
  }

  async update(location: ILocation, locationId: number) {
    let returnable;
    const canIUpdate = await db("locations")
      .select("*")
      .where("id", locationId);
    if (!canIUpdate[0]) {
      return {
        error: "Espaço não existente",
      };
    }
    const updatedRows = await db("locations")
      .where("id", locationId)
      .update(location)
      .then((data) => {
        returnable = { message: "Espaço alterado com sucesso" };
      })
      .catch((err) => {
        returnable = { error: "Erro ao alterar espaço" };
      });
    return returnable;
  }

  async delete(locationId: number) {
    let returnable;
    const canIUpdate = await db("locations")
      .select("*")
      .where("id", locationId);
    if (!canIUpdate[0]) {
      return {
        error: "Espaço não existente",
      };
    }
    const deletedRows = await db("locations")
      .where("id", locationId)
      .delete()
      .then((data) => {
        returnable = { message: "Espaço excluído com sucesso" };
      })
      .catch((err) => {
        returnable = { error: "Erro ao excluir espaço" };
      });
    return returnable;
  }

  async getList(perPage: number, page: number) {
    let returnable;
    const numberofPages = await db("locations").select("id");
    console.log(page)
    if (page !== null) {
      await db("locations")
        .select("*")
        .limit(perPage || 10)
        .offset(page * perPage || 1)
        .then((data) => {
          returnable = {
            numberofPages: numberofPages.length / (perPage || 10),
            data,
          };
        });
    } else {
      await db("locations")
        .select("*")
        .then((data) => {
          returnable = {
            numberofPages: numberofPages.length / (perPage || 10),
            data,
          };
        });
    }
    return returnable;
  }

  async detail(locationId: any) {
    return await db("locations").where("id", locationId).select("*");
  }

  async search(term: any, type: any) {
    if (term == undefined) term = "";
    if (type == undefined) type = "";

    let returnable;
    if (
      (term != null || term != undefined || term != "") &&
      (type == null || type == undefined || type == "")
    ) {
      returnable = await db("locations")
        .where("comments", "like", "%" + term + "%")
        .select("*")
        .catch((err) => {
          console.log("A");
        });
    } else if (
      (type == null || type == undefined || type == "") &&
      (term != null || term != undefined || term != "")
    ) {
      returnable = await db("locations")
        .where("type", type)
        .select("*")
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (type == null || type == undefined || type == "") &&
      (term == null || term == undefined || term == "")
    ) {
      returnable = await db("locations")
        .select("*")
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (type != null || type != undefined || type != "") &&
      (term != null || term != undefined || term != "")
    ) {
      returnable = await db("locations")
        .where("comments", "like", "%" + term + "%")
        .where("type", type)
        .select("*")
        .catch((err) => {
          console.log(err);
        });
    }
    return returnable;
  }
}

export default LocationModel;
