import express from 'express'
import serverConfig from './config/serverConfig.js'
import mongodbConnection from './config/mongodbConfig.js'
import apiRouter from "./routes/index.js"
import cors from "cors"

const app = express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use("/api",apiRouter)

app.listen(serverConfig.port, () => {
  console.log(`Example app listening on port ${serverConfig.port}`)
  mongodbConnection()
})

