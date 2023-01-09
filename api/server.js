// BUILD YOUR SERVER HERE
const bodyParser = require("body-parser")
const DBFunctions = require("./users/model")
const express = require("express");
const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get("/api/users", (req,res) => {
    DBFunctions.find().then(users =>{
        res.send(users)
    })
    .catch(err => res.status(500).send({ message: "The users information could not be retrieved" }))
})

server.get(`/api/users/:id`, (req,res) => {
    DBFunctions.findById(req.params.id).then(user => {
        if(user){
            res.status(200).send(user)    
        }else{
            res.status(404).send({ message: "The user with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).send({ message: "The user information could not be retrieved" })
    })
}),

server.post("/api/users", (req, res) => {
    console.log(req.body)
    if(req.body.name && req.body.bio){
    DBFunctions.insert(req.body).then(user => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(500).send({ message: "There was an error while saving the user to the database" })
    })
    }else{
        res.status(400).send({ message: "Please provide name and bio for the user" })
    }
})

server.delete("/api/users/:id", (req,res) => {
    DBFunctions.remove(req.params.id).then( user => {
        if(user){
            res.status(200).send(user)    
        }else{
            res.status(404).send({ message: "The user with the specified ID does not exist" })
        }
        
    })
    .catch(err => {
        res.status(500).send({ message: "The user could not be removed" })
    })
})

server.put("/api/users/:id", (req,res) => {
    DBFunctions.update(req.params.id, req.body).then(user => {
        if(!user){
            res.status(404).send({ message: "The user with the specified ID does not exist" })
        }else if(!user.name || !user.bio){
            res.status(400).send({ message: "Please provide name and bio for the user" })
        }else{
            res.status(200).send(user)
        }
        
    })
    .catch(err => {
        res.status(500).send({ message: "The user information could not be modified" })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
