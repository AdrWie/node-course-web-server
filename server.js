const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();                // Express web server

hbs.registerPartials(__dirname + '/views/partials');  

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append data to log file');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {        // Client user sends request to root directory and this application sends a response
    //res.send('<h1><b>Hello express!</b></h1>');     // Send response to client
    res.render('home.hbs', {
       pageTitle: 'Home Page', 
       welcome: 'Welcome to my homepage'     
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error message'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});