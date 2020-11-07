import app from "../../configs/serverTest";
import supertest from "supertest";
const request = supertest(app);
const headers = {
  authorization: "",
  userId: "",
};
describe("Login e gerenciamento de usuarios", () => {
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
  it("Criar novo Usuario", async (done) => {
    const body = {
      name: "Lucas Furtado",
      username: "furtado",
      email: "lucas_shiguioka@hotmail.com",
      password: "Therev a7x",
    };
    request
      .post("/user")
      .send(body)
      .set("authorization", headers.authorization)
      .set("authorization", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
        done();
      });
  });
  it("Trocar senha do usuario logado", async (done) => {
    const body = {
      password: "Therev a7x",
      actualPassword: "Eusouumguaxinin",
    };
    request
      .put("/user/changePassword")
      .send(body)
      .set("authorization", headers.authorization)
      .set("authorization", headers.userId)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        done();
      });
  });
  it("Editar um usuario", async (done) => {
    const body = {
      name: "Lucas Furtado",
      username: "furtado",
      email: "lucas_shiguioka@hotmail.com",
      password: "Therev a7x",
    };
    request
    .put('/user')
    .send(body)
    .end((err, res) => {
      if (err) throw done(err);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('message')
      done();
    });
  });
  it("Esqueci minha Senha", async (done) => {
    const body = {
      email: "lucas_shiguioka@hotmail.com",
    };
    request
      .post("/recovery")
      .send(body)
      .end((err, res) => {
        if (err) throw done(err);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('message')
        done();
      });
  });
});
