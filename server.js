const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

// Tells handlebars - hbs where the partials are located
// They are then registered with the hbs object
hbs.registerPartials(__dirname + '/views/partials')
// Set the view engine for app to handlebars
app.set('view engine', 'hbs')

// Logging middleware
app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    }) 
    next()
})

// Maintenance middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

// Serve static directory
app.use(express.static(__dirname + '/public'))

// Handlebars can use helper functions; they must be registered first
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

// HTTP route handlers
// Example: render template with config
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

// Example: render JSON
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

// Bind application to port on machine
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})