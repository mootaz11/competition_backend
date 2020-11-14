const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan");
const cors = require("cors");
const  BodyParser = require("body-parser");

const app = express();

const uri = "mongodb://localhost:27017/competition";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(morgan('tiny'));
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json());
app.use(cors());


const entrepriseRoute = require("./routes/entreprise");
const locationRoute = require("./routes/location");

app.use('/uploads',express.static('uploads'));

app.use('/entreprise',entrepriseRoute);
app.use('/location',locationRoute);


app.listen(4000,()=>{
    console.log("app is listening on 4000");
})
