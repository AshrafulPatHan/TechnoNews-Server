const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
   res.send('Server is running');
});

app.listen(port, ()=>{
   console.log(`Express is listening port ${port}`);
});

// mongodb connection
console.log(`${process.env.DB_USER},${process.env.DB_PASSWORD}`);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hesexcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

// Working With MongoDB
const database = client.db('TechnoNews');
const tests = database.collection('test');


// Test database
app.post('/post',async (req,res) =>{
   const test = req.body;
   try{
     const result = await tests.insertOne(test);
     res.send(result)
   }catch (error){
     console.error("error in add news",error)
     res.status(500).send({massage:"error inserting data"})
   }
 })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



