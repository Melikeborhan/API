const mongoose = require('mongoose');


const db =() => {
    try {
        const conn =  mongoose.connect(process.env.API_KEY, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("DB BAĞLANDII!");
    } catch (err) {
        console.log(err);
    
    }
}
module.exports = db;