const express = require('express')

const app = express()
const port = 3000

const { engine } = require('express-handlebars')

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')

app.set('views', './views')

const dotenv = require('dotenv')
dotenv.config()


const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

const client = new MongoClient(uri)

client.connect(err => {
	if (err) { throw err }
})

const db = client.db(process.env.DB_NAME)
const collection = db.collection('advertisements')



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

const upload = multer({ storage: storage })


app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }))



/* --- ROUTING --- */

/* Home pagina */

app.get('/', (req, res) => {

	// async function getAdvertisements() {

	// 	try {
	// 		let data = await collection.find({}).toArray()
	// 		return data
	// 	} catch {
	// 		return 'error'
	// 	}

	// }

	// getAdvertisements().then((data) => {
	// 	res.render('home', { pageTitle: 'Home', data: data })
	// })

	collection.find().toArray()
		.then((advertisements) => {
			res.render('home', { pageTitle: 'Home', data: advertisements })
		})
		.catch((err) => {
			console.error(err)
			res.send('err')
		})


})


/* Plaats formulier */

app.get('/plaats', (req, res) => {
	res.render('plaats', { pageTitle: 'Plaats een advertentie', mapsApiKey: process.env.MAPS_API_KEY })
})


/* Verwerken van formulier */

// app.post('/post', upload.array('images'), (req, res) => {
// 	res.render('advertentie', { pageTitle: 'Advertentie', data: req.body, files: req.files })
// })


app.post('/fetch-post', upload.array('images'), (req, res) => {

	collection.insertOne({
			title: req.body.title,
			description: req.body.description,
			images: req.body.images,
			location: req.body.location,
			locationType: req.body.location_type,
			locationSize: req.body.location_size,
			services: {
				parkingPlaces: req.body.parking_places,
				electricity: req.body.electricity,
				threePhaseElectricity: req.body.three_phase_electricity,
				water: req.body.water,
			},
			contactInformation: {
				fullName: req.body.name,
				email: req.body.email,
				phone: `+31 ${req.body.phone}`
			}
		})
		.then((result) => {
			res.send({
				success: true,
				advertisementID: result.insertedID
			})
		})
		.catch()
})


/* Errors */

app.use((req, res) => {
	res.status(404)
	res.render('error', { pageTitle: 'Error: 404 Not Found' })
})






app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})