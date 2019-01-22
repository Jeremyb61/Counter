var express = require('express');
var session = require('express-session');
var app = express();
const path = require('path');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'kdfjllkjhkjhkjhkjds',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (request, response) {
    if (request.session.page_views) {
        request.session.page_views++;
    } else {
        request.session.page_views = 1;
    }
    // console.log(request, response);
    response.render("index.ejs", { counter: request.session.page_views });
});
app.get('/count', function (request, response) {
    request.session.page_views += 1;
    // console.log(request, response);
    response.redirect("/");
});
app.get('/clear', function (request, response) {
    request.session.page_views = 0;
    response.redirect('/')
})
app.listen(8000, function () {
    console.log("listening on 8000");
});