jest.mock('fetch')

describe('Entrar e recuperar os tokens da aplicação',()=>{
    it('Logar na aplicação', async()=>{
        const data = {
            url : "http://localhost:3333/session",
            options : {
                method:"post",
                headers :{
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    username : "lfurtado",
                    password : "Therev a7x"
                })
            }
        }
        const request = await fetch(data.url,data.options)
        const response = await request.json()
        expect(request.status).toEqual(200)
        //verifica se os campos esperados no json de retorno estão corretos
        expect(response.auth).not.toBeUndefined()
        expect(response.token).not.toBeUndefined()
        expect(response.token.auth_token).not.toBeUndefined()
        expect(response.token.session_token).not.toBeUndefined()
        expect(response.token.expires_at).not.toBeUndefined()
        //verifica se os campos não estão nulos
        expect(response.auth).not.toBeNull()
        expect(response.token).not.toBeNull()
        expect(response.token.auth_token).not.toBeNull()
        expect(response.token.session_token).not.toBeNull()
        expect(response.token.expires_at).not.toBeNull()
        //verifica se os campos possuem o tipo correto
        expect(response.auth).not.toBeNaN()
        expect(response.token).not.toBeNaN()
        expect(response.token.auth_token).not.toBeNaN()
        expect(response.token.session_token).not.toBeNaN()
        expect(response.token.expires_at).not.toBeNaN()
    })
})