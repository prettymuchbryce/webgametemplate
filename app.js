var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
     res.render('./index.html');
 });

var port = 3000;

app.listen(port);