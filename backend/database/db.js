const mongoose=require("mongoose")

const connection = mongoose.connect('mongodb+srv://adi:123@cluster0.s2zqiy6.mongodb.net/test')

module.exports={connection}