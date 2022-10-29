const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'Nafis Fahim', email: 'nafis@gmail.com' },
    { id: 2, name: 'Farid Hosen', email: 'farid@gmail.com' },
    { id: 3, name: 'Tanvir Ahmed', email: 'tanvir@gmail.com' },
]

// username: userdb1
// password: Kza59ODd4ljfqplR

const uri = "mongodb+srv://userdb1:Kza59ODd4ljfqplR@cluster0.6llxg7j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        const userCollection = client.db('simpleNode').collection('users');
        const user = {name: 'Nafis Fahim', email:'nafis123@gmail.com'}

        app.get('/users',async(req,res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally{

    }
}
run().catch(err => {
    console.log(err);
})



app.get('/', (req, res) => {
    res.send('Simple node server is running')
})

app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLocaleLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else {
        res.send(users);
    }

})

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log('Server is running on', port);
})