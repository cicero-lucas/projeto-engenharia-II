const mongoose = require("mongoose");

const fPostSchema =  new mongoose.Schema({
    fk_user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    
    fk_post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

const FavoritarPost = mongoose.model('PostsFavoritos', fPostSchema);

module.exports= FavoritarPost;
