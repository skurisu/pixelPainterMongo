var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pptest');
var Schema = mongoose.Schema;

var ppSchema = new Schema({
  title: String,
  capturedGrid: Array  //change data type later
  // controlGrid: String //change data type later
});

var PixelPainter = mongoose.model('artboard', ppSchema);
//                           ^ Model Name
//                 also sets collection name to 'artboard' 

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');

app.get('/', function (req,res) {
  res.render('index');
});


app.get('/pictures', function (req,res) {

  //find all chats
  PixelPainter.find(function(err,pictures){
    if(err) throw err;
    
    res.render('pictures', {pictures : pictures});
  });
});

app.get('/picture/:id', function (req,res) {
  var id = req.params.id;
  PixelPainter.findOne({_id: id}, function (err,picture) {
    res.render('picture', {picture : picture});
  });
});


app.post('/save', function (req,res) {
  var title = req.body.title || new Date();
  var capturedGrid = req.body.capturedGrid;
  console.log(req.body);
  //create the pixelpainter object (does not save to db yet)
  var pixelpainter = new PixelPainter(
    {
      capturedGrid : capturedGrid,
      title : title
    }
  );

  // save object to db

  pixelpainter.save(function (err) {
    if (err) throw err;
    res.send('ok');
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});