import app from "./server.js";
import connectDb from "./db/connection.js";

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("App started listening on 8000")
        })
    })
