var http= require("http");

var uri = "mongodb+srv://CKSILO:5ORAyqas6RqW8Nxx@clusterck-x1wfp.mongodb.net/test?retryWrites=true";

const MongoClient = require('mongodb').MongoClient;
var mqtt = require('mqtt')
var client  = mqtt.connect('tcp://iot.eclipse.org')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Backend started')
    }
  })
})
var m='';

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(m.toString());

});

client.on('message', function (topic, message) {
  // message is Buffer
  //m=message.toString
  console.log(message.toString())
 
  m = m +"\n"+ message.toString();
  server;



const client1 = new MongoClient(uri, { useNewUrlParser: true });
client1.connect(err => {
var myobj =   { Recieved_message: message.toString()};

  
  // perform actions on the collection object
  const collection = client1.db("mqtt").collection("Messages").insertOne(myobj, function(err, res) {
    if (err) throw err;
     
   // console.log("Number of documents inserted: 3423423clear exit " + res.insertedCount);
    client1.close();
});

//client.end()
})



  });
  server.listen(3000,'127.0.0.1');
  
 