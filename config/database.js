const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

//connection db for info
//TODO :  burda seninkinin aynısı ama js6 ya uygun böyle çok daha iyi ve kısa yazabilirsin
mongoose.connect(process.env.API_KEY)
    .then(()=>console.log("Database connection Succesfully"))
    .catch(error => console.log(`Database Connection ERROR`.$(error)))


    //bu şekilde , login kısmını da nerde yanlış olduğunu gördüm onu yarın düzelteyim  tmm knk coook tesekkur ederım:) öenmli değil ylnız biraz daha clean kod yaz umut var mı doktor bey 


//baya bi var ama bu kısımlarda dediğim gibi iç içe karşık yazarsan şimdiden 4 5 sayfa içeren kısımlarda çok hata alırsın ve hatayı çözmek için tek tek bakman gerekir
