const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description: {
        type:String,
        required:true,//bu alanın zorunlu olup olmadıgını belirtir
        trim:true
    },
    stock: {    
        type:Number,
        default:0//başlangıç durumu 0 olarak gözükür. 
    },
    date: {
         type:Date,
         default:new Date()
     }
    //url vererek urun resmını de ekleyebılırız..
})

module.exports = mongoose.model('post',PostSchema) //modeli oluşturduk. 1.parametre modelin adı, 2.parametre modelin yapısı.