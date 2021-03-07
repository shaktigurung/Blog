const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

const blogRoutes = require('./routes/blogRoutes');

const PORT = 3000;

//express app
const app = express();

//connect to database
const dbURI = process.env.MONGODB_ACCESS_TOKEN;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then((result) => app.listen(PORT, () => console.log(` Server is running at PORT: ${PORT} `)))
    .catch(err => console.log(err))

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch(err => console.log(err));
// })

// app.get('/all-blogs', (req, res)=> {
//     Blog.find()
//         .then((result)=> {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });

// app.get('/single-blog', (req, res)=> {
//     Blog.findById('60431139036e735c8f35ce20')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch( err => console.log(err));
// })
// app.use((req, res, next) => {
//  console.log(`<< New Request Made >>  \n Host: ${req.hostname} \n Path: ${req.path} \n Method: ${req.method}`);
//  next();
// });

// app.use((req, res, next) => {
//     console.log(`<< in the next middleware >>  \n Host: ${req.hostname} \n Path: ${req.path} \n Method: ${req.method}`);
//     next();
// });

//Routing
app.get('/', ( req, res) => {
    //res.send('Hello World')
    //res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     { title: ' Yoshi finds eggs', snippet: 'lorem ipsum dolor sit  amet random'},
    //     { title: ' Mario finds stars', snippet: 'lorem ipsum dolor sit  amet random'},
    //     { title: ' How to defeat bowser', snippet: 'lorem ipsum dolor sit  amet random'}
    // ];
    // res.render('index', { title: 'Home', blogs});

    res.redirect('/blogs');
})

app.get('/about', ( req, res) => {
    //res.send('Hello About Page')
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about',  { title: 'About'});
})

//blog routes
app.use('/blogs', blogRoutes);


// //redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

//404 Page
app.use((req, res)=> {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404'});
})