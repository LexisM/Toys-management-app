const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')))

//Cross-origin resource sharing (CORS) is a browser mechanism
//that allows a web page to use assets and data from other pages 
//or domains. Most sites need to use resources and images to run their scripts.

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));

//connection to the database
async function main() {
  await mongoose.connect('mongodb+srv://webadmin:DataRep2022@datarep.wmalsu7.mongodb.net/?retryWrites=true&w=majority');

 
}
//Creating schema for database
const toySchema = new mongoose.Schema({
  name: String,
  price: String,
  cover: String
});
//To use schema definition, we need to convert our toySchema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const toyModel = mongoose.model('toy', toySchema);


//listening for post method to create item
app.post('/api/toys',(req,res)=>{
  console.log(req.body);

  toyModel.create({
    name: req.body.name,
    price:req.body.price,
    cover:req.body.cover
  })
  
  res.send('Data Recieved');
})

//GET request to list all the items in database
app.get('/api/toys', (req, res) => {
  toyModel.find((error, data )=>{
    res.json(data);
  })
})

//Retrieving item by id previously to update.
app.get('/api/toy/:id', (req, res)=>{
  console.log(req.params.id);
  toyModel.findById(req.params.id, (err,data)=>{
    res.json(data);
  } )
})


//listening for a put request for updating toys
app.put('/api/toy/:id', (req, res)=>{
  console.log("Update: "+req.params.id);

  toyModel.findByIdAndUpdate(req.params.id, req.body, {new:true},(error,data)=>{
      res.send(data);
    })
})


//delete records from the database 
app.delete('/api/toy/:id',(req, res)=>{
  console.log('Deleting: '+req.params.id);
  toyModel.findByIdAndDelete({_id:req.params.id},(error,data)=>{
    if(error){
      res.status(500).send(error);
    }
    res.status(200).send(data);
  })
})

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => { //req reserver word for request, res stands for respond 
  res.send('Hello World!')  // when web client send a get request the server will resport with this hello world. 
})