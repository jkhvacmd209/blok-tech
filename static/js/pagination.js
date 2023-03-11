//place buttons above keyboard

const controls = document.querySelector('.form-navigation')

window.visualViewport.addEventListener('resize', () => {
	controls.style.top = window.visualViewport.height - controls.height + 'px'
})


//variable for keeping check of step

let currentStep = 1

//functions

const goToStep = (step) => {
	steps.forEach((step) => {
		step.style.display = 'none'
	})

	steps[step - 1].style.display = 'block'

	switch (step) {
		case 1:
			prevButton.style.display = 'none'
			nextButton.style.display = 'flex'
			submitButton.style.display = 'none'
			break

		case 5:
			prevButton.style.display = 'flex'
			nextButton.style.display = 'none'
			submitButton.style.display = 'flex'
			break

		default:
			prevButton.style.display = 'flex'
			nextButton.style.display = 'flex'
			submitButton.style.display = 'none'
			break
	}

	currentStep = step
}


//get steps and buttons

const steps = document.querySelectorAll('[data-step]')

const prevButton = controls.querySelector('button:first-of-type')
const nextButton = controls.querySelector('button:nth-of-type(2)')
const submitButton = controls.querySelector('button:nth-of-type(3)')



//get inputs

const titleInput = document.querySelector('#title')
const imageInput = document.querySelector('#images')

const descriptionInput = document.querySelector('#description')
const typeInput = document.querySelector('#location_type')
const parkingInput = document.querySelector('#parking_places')
const sizeInput = document.querySelector('#location_size')


//set default step visibility

goToStep(1)



//go to next step and validate current step
nextButton.addEventListener('click', () => {

	switch (currentStep) {
		case 1:

			if (emptyInput(titleInput)) {
				setInvalid(titleInput, 'Je moet een titel invullen!')
				break
			}

			if (inputIsNotText(titleInput).value) {
				setInvalid(titleInput, `${inputIsNotText(titleInput).reason} is niet toegestaan.`)
				break
			}

			setValid(titleInput)
			goToStep(2)

			break

		case 2:

			if (noImagesInArray(images)) {
				setInvalid(imageInput, 'Je moet minstens één afbeelding toevoegen!')
				break
			}

			setValid(imageInput)
			goToStep(3)

			break

		case 3:

			goToStep(4)

			break

		case 4:

			if (emptyInput(descriptionInput)) {
				setInvalid(descriptionInput, 'Vergeet niet een omschrijving te geven!')
				break
			}

			if (inputIsNotText(descriptionInput).value) {
				setInvalid(descriptionInput, `${inputIsNotText(descriptionInput).reason} is niet toegestaan.`)
				break
			}

			setValid(descriptionInput)

			if (emptyInput(typeInput)) {
				setInvalid(typeInput, 'Vergeet niet je locatie type op te geven!')
				break
			}

			setValid(typeInput)

			if (emptyInput(parkingInput)) {
				setInvalid(parkingInput, 'Je moet een aantal parkeerplekken opgeven.')
				break
			}

			if (numberInputIsNegative(parkingInput)) {
				setInvalid(parkingInput, 'Het aantal parkeerplekken mag niet negatief zijn.')
				break
			}

			setValid(parkingInput)

			if (emptyInput(sizeInput)) {
				setInvalid(sizeInput, 'Je moet de grootte van de locatie opgeven.')
				break
			}

			if (numberInputIsNegative(sizeInput)) {
				setInvalid(sizeInput, 'De grootte mag niet negatief zijn.')
				break
			}

			setValid(sizeInput)


			goToStep(5)

			break
	}


})



//go to previous step
prevButton.addEventListener('click', () => {

	goToStep(currentStep - 1)

})



/* Form validation set functions */

const setInvalid = (input, message) => {
	input.parentElement.querySelector('.input_validation-message').textContent = `❗️ ${message}`
	input.classList.add('invalid')
}

const setValid = (input) => {
	input.parentElement.querySelector('.input_validation-message').textContent = ""
	input.classList.remove('invalid')
}


/* Form validation check functions */

const emptyInput = (input) => {
	return input.value == ""
}

const inputIsNotText = (input) => {
	let regex = /[^A-Za-zÀ-ÖØ-öø-ÿ0-9!?\.,:\ \-|()\'\"\n]+/
	return {
		value: regex.test(input.value),
		reason: input.value.match(regex)
	}
}

const noImagesInArray = (imageArray) => {
	if (imageArray.length === 0) {
		return true
	} else {
		return false
	}
}

const numberInputIsNegative = (input) => {
	let regex = /^-\d+$/
	return regex.test(input.value)
}