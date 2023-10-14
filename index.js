import express from "express";
import cors from "cors";

import {data} from "./db/dummyDB.js"

const app = express();

app.use(express.json());
app.use(cors());

app.get("/resume/:id", (req, res) => {
    try{
        const id = req.params.id;
        const result = data.find(cur=>cur.id===Number(id))
        if(!result) return res.status(404).send("not data found")
       
        res.status(200).json({result})
    }catch(err){
        res.status(err.status|| 500).json({message:(err.message || "Something went wrong")})
    }
});

app.get("/search", (req, res) => {
    try{
        const {name} =req.query
        console.log(name)
        const result = data.filter(cur=>cur.name.toLowerCase().includes(name.toLowerCase()))
       
        res.status(200).json({result})
    }catch(err){
        res.status(err.status|| 500).json({message:(err.message || "Something went wrong")})
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running");
});
