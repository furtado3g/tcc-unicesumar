# EndPoint Mapping

Gerenciamentos

- Usuário
- Sessão
- Reservas
- Laboratórios

### Endpoints e methods

- Usuários
    - (POST) /users/new

        ```json
        {
        	"name":"Full name",
        	"username":"User name",
        	"email":"Email",
        	"password":"password" 
        }
        ```

    - (PUT) /users/update

        ```json
        {
        	"userId":"user_id",
        	"name":"Full name",
        	"email":"Email",
        	"password":"password"
        }
        ```

    - (DELETE) /users/{{USER_ID}}/delete
    - (GET) /users
    - (GET) /users/{{USER_ID}}
    - (GET)/users?term=[?]
- Sessão
    - (post) /session

        ```json
        {
        	"username":"user name",
        	"password":"password"
        }
        ```

    - (post) /session/validate

        ```json
        {
        	"authToken":"token de autenticação",
        	"sessionToken":"token de sessão"
        }
        ```

    - (delete) /session

        ```json
        {
            "userId":"id do usuario",
            "sessionToken":"token da sessão"
        }
        ```

- Reservas
    - (post) /reserve

        ```json
        {
        	"userId":"",
        	"locationId":"",
        	"date":"",
          "time_start":"",
          "time_end":"",
          "class":"",
          "discipline":"",
          "comments":""
        }
        ```

    - (put) /reserve

        ```json
        {
        	"reservetionId":"",
        	"date":"",
          "time_start":"",
          "time_end":"",
          "comments":""
        }
        ```

    - (delete) /reserve/{{reseve_id}}
    - (get) /reserve/list
    - (get) /reserve/{{reserve_id}}
    - (get)  /reserve?term=[?]
- Locais

    - (post) /location

    ```json
    {
    	"tpLocation":"",
        "comments":"",
    	"capacity":""
    }
    ```

    - (put) /location

    ```json
    {
    	"locationId":"",
    	"tpLocation":"",
        "comments":"",
    	"capacity":""
    }
    ```

    - (delete)/location{{locationId}}

    - (get) /location/list

    - (get) /location/{{locationId}}

    - (get) /location?term=[?]