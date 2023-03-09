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


const multer = require('multer')

let imageID = 0

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, `static/upload/${req.body.title}/`)
	},
	filename: (req, file, callback) => {
		console.log(file)
		callback(null, `${imageID}.${file.mimetype.split('/')[1]}`)
		imageID++
	}
})

const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

client.connect(err => {
	if (err) { throw err }
})

const db = client.db(process.env.DB_NAME)

const upload = multer({ storage: storage })


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

// app.post('/plaats-advertentie', upload.array('images'), (req, res) => {
// 	res.render('advertentie', { pageTitle: 'Advertentie', data: req.body, files: req.files })
// })

app.get('/plaats-advertentie', (req, res) => {

	function done(err, data) {
		console.log('functie werkt')
		if (err) {
			console.log(err)
		} else {
			console.log(data)
			res.send('test')
		}
	}

	console.log('there was a request')

	db.collection('advertisements').find().toArray(done)


})


/* Errors */

app.use((req, res) => {
	res.status(404)
	res.render('error', { pageTitle: 'Error: 404 Not Found' })
})






app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})