const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');



//db connection src
// TODO: bu kısımda app.js ye mongoyu sen zaten dahil etmiştin ama tekrardan bir isim vermeye gerek yok nodejs onu kendi derleyebiliyor,tekrardan isim verenler var ama onlar veritabanını özelleştirmede kullanılıyor şuanlık grek yok
require('./config/database');

const app = express();

dotenv.config();
const Auth = require('./routes/auth.js')
const Post = require('./routes/post.js')


app.use(cors());//TODO:   cors kullanma nedenımız  dısarıdan verı alırken sıkıntı olmaması ıcın kullanıyoruz kulllanmazsak eger dısarıdan verı alamayız
//dışarıdan veri gönderildiğinde sıkıntı olmadan verı gondermeye yarar gıbı dusunebılırız
app.use(express.json({limit: '30mb',extended: true}))
app.use(express.urlencoded({limit: '30mb',extended: true}))


//register
// TODO: bu kısımda biz artık api  yazdığımız için /api/ diye her url için kendi rotasını vermemiz gerek / yaparsak her istek aynı yere gidiyor
app.use('/api/auth',Auth)
app.use('/api/posts',Post)


const PORT = process.env.PORT || 5000; //burası sana kalmış ama genelde 3000de çalışıyor nodejs 5000 de de angular veya react gibi çalıştırırım bu tamammen özel öylesine ekledim


app.listen(PORT,()=> {
  console.log("server calıştı: http://localhost:5000/");
})