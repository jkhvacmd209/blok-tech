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
const ObjectId = require('mongodb').ObjectId

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

const client = new MongoClient(uri)

client.connect((err) => {
	if(err) {
		throw err
	}
})

console.log('Succesfully connected to database')

const db = client.db(process.env.DB_NAME)
const collection = db.collection('advertisements')

const multer = require('multer')

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'static/upload/')
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname)
	},
})

const upload = multer({
	storage: storage
})

app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }))


/* --- VALIDATION FUNCTIONS ---*/

const checkboxToBool = (value) => typeof value === 'string' ? value === 'on' || value === "true" ? true : false : false

const isObjectIdValid = (id) => ObjectId.isValid(id) ? String(new ObjectId(id) === id) ? true : false : false // Source: https://stackoverflow.com/a/29231016

/* --- ROUTING --- */

/* Home pagina */

app.get('/', (req, res) => {

	collection.find().toArray()
		.then((advertisements) => {
			let sortedAdvertisements = advertisements.sort((current, next) => {
				return new Date(next.time) - new Date(current.time)
			})
			res.render('home', {
				pageTitle: 'Home',
				data: sortedAdvertisements
			})
		})
		.catch((err) => {
			console.error(err)
			res.send('err')
		})
})

app.get('/advertentie/:id', (req, res) => {

	if(!isObjectIdValid(req.params.id)) {
		send404(res)
	} else {

		collection.findOne({ _id: new ObjectId(req.params.id) })
			.then((advertisement) => {
				if(advertisement === null) {
					send404(res)
				} else {
					console.log(advertisement)
					res.render('advertentie', {
						pageTitle: advertisement.title,
						data: advertisement
					})
				}
			})
	}
})

/* Plaats formulier */

app.get('/plaats', (req, res) => {
	res.render('plaats', {
		pageTitle: 'Plaats een advertentie',
		mapsApiKey: process.env.MAPS_API_KEY
	})
})

/* Verwerk formulier */

app.post('/post', upload.array('images'), (req, res) => {

	let images = []

	req.files.forEach((file) => {
		images.push(file.filename)
	})

	collection.insertOne({
			time: new Date(),
			title: req.body.title,
			description: req.body.description,
			images: images,
			location: req.body.location,
			locationType: req.body.location_type,
			locationSize: req.body.location_size,
			services: {
				parkingPlaces: req.body.parking_places,
				electricity: checkboxToBool(req.body.electricity),
				threePhaseElectricity: checkboxToBool(req.body.three_phase_electricity),
				water: checkboxToBool(req.body.water)
			},
			contactInformation: {
				fullName: req.body.name,
				email: req.body.email,
				phone: `+31 ${req.body.phone}`
			}
		})
		.then((result) => {
			if(req.headers.accept.includes('application/json')) {
				res.send({
					success: true,
					advertisementID: result.insertedId
				})
			} else {
				res.redirect(`/advertentie/${result.insertedId}`)
			}
		})
})

/* Errors */

const send404 = (res) => {
	res.status(404)
	res.render('error', {
		pageTitle: 'Error: 404 Not Found'
	})
}

app.use((req, res) => {
	send404(res)
})

app.listen(port, () => {
	console.log(`Yes! The server is running and listening on port ${port}`)
})