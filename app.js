const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/work');
let db = mongoose.connection;
//check connection
db.once('open',function(){
  console.log('connected');
})

// check for db errors
db.on('error',function(err){
  console.log(err);
});

const app = express();

let Work = require('./models/user');

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
  Work.find({},function(err, works){
    res.render('index',{
      title:'Work',
      works: works
    });
  });
});



app.get('/register',function(req,res){
  res.render('register',{
    title:'Register'
  });
});

app.post('/register',function(req, res){
  let work = new Work(req.body);
  work.userid = req.body.userid;
  work.username = req.body.username;
  work.address = req.body.address;
  work.number = req.body.number;
  work.work = req.body.work;
  work.area = req.body.country;
  work.zip = req.body.zip;
  work.email = req.body.email;
  work.msex = req.body.msex;
  work.fsex = req.body.fsex;

  work.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

app.get('/work/:work',function(req,res){
  Work.find({ work: req.params.work },function(err, work){
    res.render('workbycat',{
      work:work
    });
  });
});

//get area wise
app.get('/work/:area',function(req,res){
  Work.find({ area: req.params.area },function(err, work){
    res.render('workbyarea',{
      work:work
    });
  });
});


app.get('/work/:area/:work',function(req,res){
  Work.find({$and:[{ area: req.params.area },{ work: req.params.work }]},function(err, work){
    console.log(work);
    return;
  });
});
app.listen(3000,function(){
  console.log('server started on port 3000...');
});
