import app from "../../configs/serverTest";
import supertest from "supertest";
const request = supertest(app);

const headers = {
  authorization: "",
  userId: "",
};

let locationId: any;
let locationTypeId: any;

describe("Teste do gereciamento de Locais", () => {
  it("Logar na aplicação", async (done) => {
    const body = {
      username: "Furts3g",
      password: "Therev a7x",
    };
    request
      .post("/session")
      .send(body)
      .end(function (err, res) {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body.token).toHaveProperty("authToken");
        expect(res.body.token).toHaveProperty("sessionToken");
        expect(res.body.token).toHaveProperty("expires_at");
        headers["authorization"] = res.body.token.sessionToken;
        headers["userId"] = res.body.userId;
        done();
      });
  });

  it("Criar novo tipo de local", (done) => {
    const body = {
      description: "Automação",
    };
    request
      .post("/location/type")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
  it("Listar Tipo de Locais", (done) => {
    request
      .get("/location/type")
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("description");
        locationTypeId = res.body[0].id;
      });
  });

  it("Criar novo local", (done) => {
    const body = {
      tp_location: locationTypeId,
      comments: "Ola mundo",
      capacity: 100,
    };
    request
      .put("/location")
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Listar locais", (done) => {
    request
      .get("/location")
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("comments");
        expect(res.body[0]).toHaveProperty("capacity");
        expect(res.body[0]).toHaveProperty("type");
        locationId = res.body[0].id;
        done();
      });
  });
  it("Detalhar Local", (done) => {
    request
      .get(`/location/${locationId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("comments");
        expect(res.body).toHaveProperty("capacity");
        expect(res.body).toHaveProperty("type");
        done();
      });
  });
  it("Editar Locais", (done) => {
    const body = {
      tp_location: locationTypeId,
      comments: "Ola mundo",
      capacity: 100,
    };
    request
      .put(`/location/${locationId}`)
      .send(body)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Excluir Local", (done) => {
    request
      .delete(`/location/${locationId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
      });
  });
  it("Excluir tipo de local", (done) => {
    request
      .delete(`/location/type/${locationTypeId}`)
      .set("authorization", headers.authorization)
      .set("userid", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
});