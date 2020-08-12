import express from 'express';
import routes from './router';
const app = express()
const port = 3333;

app.use(express.json())
app.use(routes)

app.listen(port,()=>{
    console.log("server started at port "+port)
})