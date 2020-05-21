const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const router = require("./router")
const mongoose = require("mongoose")
const cors = require("cors")
//DB setup
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true})
mongoose.connection.once('open',function () {
    console.log('Connected');
}).on('error',function (error) {
    console.log('CONNECTION ERROR:',error);
});
//app setup
//middlewares
//morgan is login framework, used for debugging
app.use(morgan("combined"))
// body parser parses request
app.use(bodyParser.json({type:'*/*'}))

app.use(cors())

router(app)
//server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port);
console.log("server listening on",port)