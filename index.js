require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3005
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');
const GalleryItem = require('./models/galleryItem')
mongoose.connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        //Weil der Server erst laufen soll, wenn wir zur DB verbunden sind, machen wir das Listen hier!
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    //DB abrufen, auch diese ist asynchron => then / catch
    GalleryItem.find()
    .then(result => {
        // res.send(result)
        res.render('index', {galleryData: result})

    })
    .catch(err => console.log(err) )
})

// app.get('/add-new', (req, res) => {
//     const newGalleryItem = new GalleryItem({
//         url: 'https://images.unsplash.com/photo-1610368020268-2529f89bac93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//         articlename: 'Vladyslav Tobolenko',
//         price: 9,
//         brandname:'Under Armour'

//     })
//     newGalleryItem.save()
//     .then(result => {
//         res.redirect('/')
//     })
//     .catch(err => console.log(err))
// })


app.get('/add', (req, res) => {
    GalleryItem.find()
    .then(result => {
        const productData = result
        const randomData = productData.sort(() => .5 - Math.random()).slice(0,6)
        res.render('add', {productData, randomData})
    })
    .catch(err=> console.log(err))
})

app.post('/add-product', (req, res) => {
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
})

app.get('/single/:pictureId', (req, res) => {
    console.log(req.params.pictureId);
    GalleryItem.findById(req.params.pictureId)
    .then(result => {
        res.render('single', {picture: result})
    })
    .catch(err => console.log(err))
    })

    app.get('/single/:pictureId/delete', (req, res) => {
    GalleryItem.findByIdAndDelete(req.params.pictureId)
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
})

app.post('/single/:pictureId/edit', (req, res) => {
    console.log(req.body)
    GalleryItem.findByIdAndUpdate(req.params.pictureId, req.body)
    .then(result => res.redirect(`/single/${req.params.pictureId}`))
    .catch(err => console.log(err))
})