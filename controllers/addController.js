const GalleryItem = require('../models/galleryItem')

const add_get =  (req, res) => {
    GalleryItem.find()
    .then(result => {
        const productData = result
        const randomData = productData.sort(() => .5 - Math.random()).slice(0,6)
        res.render('add', {productData, randomData})
    })
    .catch(err=> console.log(err))
}

const add_post = (req, res) => {
    console.log(req.body);
    const newGalleryItem = new GalleryItem({
        url: req.body.url,
        articlename: req.body.articlename,
        price: req.body.price,
        brandname: req.body.brandname,
        description: req.body.description
    })
    newGalleryItem.save()
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

module.exports ={
    add_get,
    add_post
}