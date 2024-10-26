const express = require("express");
const path = require("path");

const app = express();

app.use('/public', express.static(__dirname));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.resolve(__dirname, 'views'));

app.listen(8080);

app.get('/', (request, response) => {
    return response.render('index');
})

app.get('/test2', (request, response) => {
    return response.render('index2');
})