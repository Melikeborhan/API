const moongose = require('mongoose')
const { required } = require('nodemon/lib/config')

const AuthSchema = new moongose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true//benzersiz olacak
    },
    password:{
        type:String,
        required:true
        
    },
    userToken:{ //TODO : token eklemişsin ama veritabanına eklememişsin
        type:String
    },
    refreshToken:{ //TODO : gelen token 1 saate veya senin berlirdiğin bir saat sonra gidince otomatik bir token gelicek bu onu sağlıyor
        type:String
    },
    date:{
    type:Date,
    default:new Date()

    }

})
module.exports = moongose.model('auth',AuthSchema)

//daha sonra cmd de çalışma poweshellde çalış linux komutalrını algılıyor clear gibi npm init gibi sistemleri orda yükle sağ altta artı işretine bastıktan sonra tmm