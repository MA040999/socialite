const db = require('../models')

const createPost = async function(req, res){
    const data = req.body;
    // db.Posts.create({data})
    console.log(`data`, data)
}

module.exports = { createPost }