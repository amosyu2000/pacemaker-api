const express = require('express');
const { router } = require('./controllers');

// Create a new express application
const app = express();

// Engine converts pug files into HTML before serving
app.set('view engine', 'pug');
// Adds indents to JSON responses so that it is more readable
app.set('json spaces', 2);

// Directly serve files from the 'static' directory
app.use(express.static('static'))
app.use(router);

app.listen(process.env.port || 8080);