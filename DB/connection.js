const { response } = require('express');
const { MongoClient, ServerApiVersion} = require('mongodb');
const respond = require('../helpers/responder');

const url = "mongodb+srv://magburdiles:wZZyiA8YzLsLqIC3@mongocluster.2m6f5.mongodb.net/?retryWrites=true&w=majority&appName=mongoCluster&ssl=true";
const client= new MongoClient(url, {
    serverApi : {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});



async function run() {
    try {
        await client.connect();
        const db= await client.db("violin");
        console.log("Conexión exitosa");
        return db;
    } catch (error) {
        console.log(error);
        //client.close();
    } 
};

module.exports= { run } ;