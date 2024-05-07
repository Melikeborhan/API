const express = require('express')

const { getPosts, createPosts, getDetail ,getUpdate, deletePosts} =require('../controllers/post.js');


const router = express.Router();

router.get('/getPosts',getPosts)
router.post('/createPosts',createPosts)
router.get('/getDetail/:id',getDetail)
router.patch('/getUpdate/:id',getUpdate)//patch güncelleme yapar    
router.delete('/deletePosts/:id',deletePosts)
//fılter gelecek
/*
Patch, kaynakların kısmi güncellemeleri için kullanılır.
Update, kaynakların tam güncellemeleri için kullanılır.
Patch idempotenttir, update ise idempotent değildir.
Genellikle patch, hata düzeltmeleri veya küçük değişiklikler için kullanılır.
Genellikle update, bir kaynağın tüm bilgilerini güncellemek için kullanılır.
*/
module.exports = router //router ı dısarı aktardık
