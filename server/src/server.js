import express from "express"
const app = express()

app.get("/", (req, res) => {
    res.send("hello")
})



import workerRouter from "./routes/worker.route.js"

app.use("/worker", workerRouter)




export default app;