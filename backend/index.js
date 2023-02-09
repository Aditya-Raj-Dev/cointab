const express=require("express")
const cors=require("cors")
const axios=require("axios")
const { connection } = require("./database/db")
const { CointabModel } = require("./model/cointab.mode")

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    axios.get('https://randomuser.me/api/?results=50')
    .then(async r => {
            const users=await r.data.results.map(item=>({
                gender : item.gender,
                fname :item.name.first,
                lname: item.name.last,
                city: item.location.city,
                state:item.location.state,
                country:item.location.country,
                email: item.email,
                age:item.dob.age,
                image:item.picture.medium
            }))
         await CointabModel.insertMany(users)
         .then(()=>{
            res.send({"msg":"success","data":users})
         })
         .catch((e)=>{
            res.send({"msg":"error","error":e})
         })
    })
    .catch(e => {
      res.status(500).send({ error: e.message });
    });
})

app.delete("/",async(req,res)=>{
    try{
        await CointabModel.deleteMany({})
    res.send({"msg":"success"})
    }
    catch{
        res.send({"msg":"please try Again"})
    }
})

app.get("/detail",async(req,res)=>{
     try{
        const page=parseInt(req.query.page) || 1;
        const limit=10;
        const startindex= ( page-1)*limit;
        const lastindex= page*limit;

        const users=await CointabModel.find().limit(limit).skip(startindex).exec()
        res.send({"msg":"success","data":users})
     }
     catch(e){
  res.status(500).send({"msg":"error","error":e})
     }
})



app.listen(8080,async()=>{
    try{
        await connection
        console.log("database connected")
    }
    catch{
        console.log("NOt connected")
    }
})