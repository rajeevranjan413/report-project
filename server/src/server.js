import express from "express"
const app = express()

app.get("/", (req, res) => {
    res.send("hello")
})



import reportRouter from "./routes/report.route.js"

app.use("/report", reportRouter)




export default app;