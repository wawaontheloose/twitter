var store = require('../store');
var express = require('express');
var router = express.Router();
//* GET home page. */
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var lists = store.find({name: name});
 
  res.render('index', { title: 'Twitter.js - Posts by '+ name, tweets: lists, show_form: true});
});



router.get('/', function(req, res) {
  var tweets = store.list();
  res.render('index', { title: 'Twitter.js', tweets: tweets, show_form:true});
});



router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var tweetId = Number(req.params.id);
  var list = store.find({id: tweetId});

  res.render('index', { title: 'Twitter.js - A single tweet by ' + name, tweets: list, show_form: true});
});



router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  var length = store.dataLength();

  store.push(name, text);
  console.log("running");

  io.sockets.emit("new_tweet", {name: name, text: text, id: length});

  res.redirect('/');

}); 



module.exports = router;
