const express = require('express');
const nknClient = require('nkn-client');
const bodyParser = require("body-parser"); 
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

const client = nknClient({
    identifier:  "testname",
    seed:  "2bc5501d131696429264eb7286c44a29dd44dd66834d9471bd8b0eb875a1edb0",
    seedRpcServerAddr: "http://34.83.47.154:30003",
});

client.on('connect', () => {
    console.log("connected to nkn node");
});

app.post('/message', (req, res)=>{
    console.log(req.body);
    client.publish(
        'pubsubde3589c0dad72d94541a34be1f99fc1ca3e78816',
        0,
        JSON.stringify({"topic": "nknpubsubx", "content": req.body.content}),
    );

    res.json("done.");
})

app.listen(80, () => {
    console.log(`app listening on port 80`)
})


