const express = require('express'); const app = express()
const indexRouter = require('./routers/indexRouter')
const path = require('node:path')
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Listening on Port ${PORT}`) )  