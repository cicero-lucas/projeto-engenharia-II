const mongoose = require("mongoose");

const tipopost = mongoose.model('tipopost',{
    "tipoPost":String
});

module.exports=tipopost
