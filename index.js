const express=require('express');
const bodyParser = require("body-parser")
const dbconnect = require("./config/dbconnect");
const app=express();
const dotenv=require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./route/authRoute');
const { notFound, errorHandler } = require('./middleware/errorhandler');



dbconnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/user', authRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});

