import express from 'express';
import mongoose from 'mongoose';
import { bodyParser, checkLicenseKey, defaultResponse } from './middlewares';
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

// Endpoints
app.use('/', routes.home);
app.use(bodyParser);
app.use('/admin', routes.admin);
app.use(checkLicenseKey);
app.use('/bundle', routes.bundle);
app.use('/user', routes.user);

// Default response
app.use(defaultResponse);

app.listen(process.env.PORT || 8080);