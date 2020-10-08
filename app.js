import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as routes from './routes';

// Create a new express application
const app = express();

// Connect to the database
mongoose.connect(process.env.DB_ADDRESS, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Engine converts pug files into HTML before serving
app.set('view engine', 'pug');
// Adds indents to JSON responses so that it is more readable
app.set('json spaces', 2);

// Directly serve files from the 'static' directory
app.use(express.static('static'))

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoints
app.use('/', routes.home);
app.use('/admin', routes.admin);
app.use('/user', routes.user);

app.listen(process.env.PORT || 8080);