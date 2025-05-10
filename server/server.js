import express from "express"

const app=express();

const port=5000

app.get('/',(req,res)=>{
    res.send("connected")
})

app.listen(`Server is running at ${port}`)