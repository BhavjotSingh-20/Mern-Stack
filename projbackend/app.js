require('dotenv').config()

const mongoose = require("mongoose")
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const formidable = require("formidable")

//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order");
const order = require('./models/order');
const stripeRoutes = require("./routes/stripepayment")
//DB CONNECTION
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("Database Got OOPS!!")
})

//MIDDLEWARES
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
// app.use(formidable)

//MY ROUTES
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",stripeRoutes)

//PORT
const port = process.env.PORT || 8000

//STARTING A SERVER
app.listen(port,() => {
    console.log(`App is running at port ${port}`)
})