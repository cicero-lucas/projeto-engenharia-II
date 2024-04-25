const mongoose = require("mongoose");

const fPost = mongoose.Schema({
    fk_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fk_post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})

const favoritarPost= mongoose.model('postFavorito',fPost);

module.exports=favoritarPost