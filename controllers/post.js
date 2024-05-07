const PostSchema = require('../models/post.js');



const createPosts = async(req,res)=>{//ben dısarıda rewuest body lerı aldım bunlar ustunden urun olustuurmak ıstıyorum
    try{
    const newPost = await PostSchema.create(req.body)
    res.status(201).json({
        newPost
    })
    }catch(error){
        return res.status(500).json({message:error.message})

    }
}

//tum postları getirir
const getPosts = async(req,res)=>{//ben dısarıda rewuest body lerı aldım bunlar ustunden urun olustuurmak ıstıyorum 
    try{
    const getPosts = await PostSchema.find()
    res.status(200).json({
        getPosts
    })
    }catch{
        return res.status(500).json({message: error.message})

    }
}

//id ye göre detay getirir
const getDetail = async(req,res)=>{
    try{
        const {id} = req.params;//params: url üzerinden gelen verileri almak için kullanılır.
    const detailPost = await PostSchema.findById(id)
    res.status(200).json({
        detailPost
    })
    }catch{
        return res.status(500).json({message:error.message})

    }
}

//id ye göre güncelleme yapar
const getUpdate = async(req,res)=>{
    try{
    const {id} = req.params;// id alarak güncelleme yapar
    const updatePost = await PostSchema.findByIdAndUpdate(id,req.body,{new:true})//önce id alır sonra güncelleme yapar
    res.status(200).json({
        updatePost
    })
    }catch{
        return res.status(500).json({message:error.message})

    }
}


const deletePosts = async(req,res)=>{
    try{
    const {id} = req.params;//id alarak silme işlemi yapar
    await PostSchema.findByIdAndDelete(id)//findByIdAndDelete metodu ile findByIdAndRemove farkı şudur ki findByIdAndRemove metodu mongoose 4.0.0 sürümünden itibaren kaldırılmıştır. Bu yüzden kullanılmamalıdır.
    res.status(201).json({
        message:"silme işleminiz başarılıdır.."
    })
    }catch{
        return res.status(500).json({message:error.message})
    }
}

const searchPosts = async(req,res)=>{
    try{
    const {title} = req.query;
    const searchPosts = await PostSchema.find({title:{$regex:title,$options:"$i"}})//$regex: arama yapmak için kullanılır. $options: i harfi büyük veya küçük harf duyarlılığını kaldırır.
    res.status(200).json({
        searchPosts
    })
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    createPosts,
    getPosts,
    getDetail,
    getUpdate,
    deletePosts
    
}
