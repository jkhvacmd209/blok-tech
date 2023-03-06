const advertenties = [{
		title: 'Locatie in Amsterdam',
		description: 'Het Theo Thijssenhuis van de Hogeschool van Amsterdam',
		images: [],
		location: 'Amstelcampus Wibautstraat 2 TTH, 1091 GM Amsterdam, Nederland',
		locationType: 'school',
		locationSize: 33000,
		services: {
			parkingPlaces: 115,
			electricity: true,
			threePhaseElectricity: false,
			water: true
		},
		contactInformation: {
			fullName: 'Joppe Koops',
			email: 'joppe.koops@hva.nl',
			phone: ''
		}
	},
	{
		title: 'Locatie in centrum Amsterdam',
		description: 'Het centraal station van Amsterdam',
		images: [],
		location: 'Stationsplein, 1012 AB Amsterdam',
		locationType: 'station',
		locationSize: 50000,
		services: {
			parkingPlaces: 0,
			electricity: true,
			threePhaseElectricity: false,
			water: true
		},
		contactInformation: {
			fullName: 'Joppe Koops',
			email: 'joppe.koops@hva.nl',
			phone: ''
		}
	}
]


const express = require('express')

const app = express()
const port = 3000

const { engine } = require('express-handlebars')

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')

app.set('views', './views')

const dotenv = require('dotenv')
dotenv.config()

app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }))



/* --- ROUTING --- */

/* Home pagina */

app.get('/', (req, res) => {
	res.render('home', { pageTitle: 'Home', data: advertenties })
})


/* Plaats formulier */

app.get('/plaats', (req, res) => {
	res.render('plaats', { pageTitle: 'Plaats een advertentie', mapsApiKey: process.env.MAPS_API_KEY })
})


/* Verwerken van formulier */

app.post('plaats-advertentie', (req, res) => {

})


/* Errors */

app.use((req, res) => {
	res.status(404)
	res.render('error', { pageTitle: 'Error: 404 Not Found' })
})






app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})