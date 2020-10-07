const fs = require('fs');
const marked = require('marked');
const path = require('path');

// Renders the README as html for the home page
function home(req,res) {
	res.render(
		'index',
		{contents : marked(fs.readFileSync(path.resolve('./README.md'), 'utf8'))}
	);
}

exports.home = home;