const { v1: uuidv1 } = require('uuid');
const db = require('../models')

const createPost = async function(req, res){
    const uploadFolderPath = '/uploads/';

    const content = req.body.content;
    const images = req.files.file;
    images.forEach(function(image){
        let extData = image.name.split('.')
        let ext = extData[extData.length - 1].toString()
        let imageUrl = uploadFolderPath + uuidv1() + '.' + ext
        let uploadPath = process.cwd() + imageUrl
        console.log(`uploadPath`, uploadPath)
        image.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);

            console.log('File uploaded!');
        });
    })
    // db.Posts.create({data})
    console.log(`data`, images)
}

module.exports = { createPost }