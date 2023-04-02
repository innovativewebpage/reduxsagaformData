const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./db');


app.use(cors());
app.use(express.json())




const MovieRoute = require('./movieRoutes');
app.use('/app/movie',MovieRoute);

const UserRoute = require('./user.modal');
app.use('/app/user',UserRoute);

//Start the server
const port = process.env.PORT || 5000;

//var port =5000;






app.listen(port,function(){
	console.log('server start on port' + port);
});

