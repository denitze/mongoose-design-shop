require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3005
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');
const addRoutes = require('./routes/addRoutes')
const singleRoutes = require('./routes/singleRoutes')
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

// Probedata
//app.get('/add-new', (req, res) => {
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

app.use('/add', addRoutes)
app.use('/single', singleRoutes)
