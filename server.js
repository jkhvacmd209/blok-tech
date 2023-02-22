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

app.get('/plaats', (req, res) => {
	res.render('plaats', { pageTitle: 'Plaats een advertentie' })
})

app.use((req, res) => {
	res.status(404)
	res.send('404')
})

app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})