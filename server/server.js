const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(express.urlencoded({extended: true}));   // TODO ASK ABOUT THIS LINE
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));



//router setup
const toDoRouter = require('./routes/todo.router.js')
app.use('/todo', toDoRouter);



//end of page
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`quietly eavesdropping on port: ${PORT}...`);
})


