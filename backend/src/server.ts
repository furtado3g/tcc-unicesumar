import express from 'express';
import routes from './router';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument  from './swagger.json'
const app = express()
const port = 3333;

app.use(express.json())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(routes)
app.listen(port,()=>{
    console.log("server started at port "+port)
})