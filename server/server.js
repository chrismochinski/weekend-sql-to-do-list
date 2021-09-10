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



//
const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/book.router.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/books', booksRouter);

// Serve back static files by default
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
