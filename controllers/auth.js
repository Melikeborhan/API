// const bcrypt = require('bcryptjs/dist/bcrypt.js')
const Auth = require('../models/auth.js')
// const { required } = require('nodemon/lib/config')
//const bcrypt = require('bcryptjs')
const bcrypt = require('bcrypt');  //bu nesne de js değildi çünkü o npm sitesindeki insttall değildi mesela bu tarzz bi npm dosyası lazım olduğunda npm nin kendi istesinden kontrol et ben kontrol etmesem bunun soununda js kalırdı ve sürüm farkında şifreleme yapmazdı
const jwt = require('jsonwebtoken')


//REGİSTER
// REGISTER
const register = async (req, res) => {
   
    try {
        //önce her zaman gelen veriyi kontrol et loglara veri geliyormu gibi aşağıda veriyi görürse veya görmezse diye kontrol ettik
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Kullanıcı adı, e-posta ve parola gereklidir." });
        }

        const user = await Auth.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Bu e-posta hesabı zaten bulunmaktadır." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Parola en az 6 karakter olmalıdır." });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10); //10 değerinin bir anlamı yok 12 de olur şifreyi kırmaya çalışan hacker için işleri zorlaştırıyor sadece burası

        
        const userToken = jwt.sign({ email }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
        authenticate();
        //create fonksiyonunu kullanırsak şifre değerinin değerine ne gelmesi gerektiğini göstermek yetmiyor onun yerine save ile şifrenin yeni değerini gösterip ekleyebiliyoruz, token değişkeni de veritabanına ekleneceği veya eklenmeyeceği için o yazılımcının tokeni ne sıklıkla değiştireeceğine kalmış ama eklemek istersen bu şekilde sonradan save içine ekliyoruz
        const newUser = new Auth({
            username,
            email,
            password: hashedPassword,
            userToken 
        });
        
        await newUser.save();

        res.status(201).json({
            status: "OK",
            newUser: newUser.toObject(), // user nesnesine artık birden fazla değer attığımız için bir obje oldu bizde çok değer gelicek bak bu obje oldu ona göre değer al diyoruzki veritabanına 1 nesneden 4 veya 5 nesne gönderelim
            userToken
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//LOGIN 
const login = async (req, res) => {
    try {
        //kontrol aşaması
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "E-posta ve parola gereklidir." });
        }

        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        //şifrelenen şifreyi tekrar eski haline getirme (eski haline sen getirebiliyorsan hacker da getirebilir o yüzden şifrelemede kullandığın secratlar sağlam olmalı)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Hatalı parola." });
        }

        const userToken = jwt.sign({ email }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(200).json({
            status: "OK",
            user: user.toObject(),
            userToken
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {register,login}