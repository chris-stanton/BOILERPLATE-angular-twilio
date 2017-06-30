
DotEnv = require('dotenv-node');
  new DotEnv();

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var twilio = require('twilio');


// Twilio Credentials
var accountSid = process.env.ACCOUNT_ACCOUNTSID;
var authToken = process.env.ACCOUNT_AUTHTOKEN;

//require the Twilio module and create a REST client
var client = twilio(accountSid, authToken);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendFile(path.resolve('index.html'));
});

app.listen(5000, function(){
  console.log('server up on 5000');
});

app.post('/sendMessage',function(req,res){
  client.messages.create({
      to: "+1" + req.body.phone,
      from: process.env.ACCOUNT_SENDINGNUMBER,
      body: req.body.message,
  }, function(err, message) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log(message.sid);
      res.sendStatus(200);
    }
  });
});
