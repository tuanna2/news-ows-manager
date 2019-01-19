const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const RootRouter = require('./app/routers/root_router');

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set("views","./views"); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(new RootRouter().getRouter());

app.listen(3000);