import npmBodyParser from 'body-parser';

// Middleware that converts the encoded request body into usable JSON
export const bodyParser = npmBodyParser.urlencoded({ extended: false });