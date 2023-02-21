const express = require('express')

const app = express()
const port = 3000

const { engine } = require('express-handlebars')

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')

app.set('views', './views')

app.use(express.static('static'))

app.get('/', (req, res) => {
	res.render('home', { pageTitle: 'Plaats een advertentie' })
})

app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})