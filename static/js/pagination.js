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


//set default step visibility

goToStep(1)



//go to next step
nextButton.addEventListener('click', () => {

	switch (currentStep) {
		case 1:

			if (emptyInput(titleInput)) {
				console.log('title input is empty')
				setInvalid(titleInput, 'Je moet een titel invullen!')
				break
			}

			if (isNotText(titleInput).value) {
				setInvalid(titleInput, `${isNotText(titleInput).reason} is niet toegestaan.`)
				break
			}

			setValid(titleInput)
			goToStep(2)

			break

		case 2:

			if (noImages(images)) {
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

			goToStep(5)

			break
	}


})



//go to previous step
prevButton.addEventListener('click', () => {

	goToStep(currentStep - 1)

	// switch (currentStep) {
	// 	case 2:

	// 		goToStep(1)

	// 		break

	// 	case 3:

	// 		goToStep(2)

	// 		break

	// 	case 4:

	// 		goToStep(3)

	// 		break

	// 	case 5:

	// 		goToStep(4)

	// 		break
	// }


})


const setInvalid = (input, message) => {
	input.parentElement.querySelector('.input_validation-message').textContent = `❗️ ${message}`
	input.classList.add('invalid')
}

const setValid = (input) => {
	input.parentElement.querySelector('.input_validation-message').textContent = ""
	input.classList.remove('invalid')
}


const emptyInput = (input) => {
	return input.value == ""
}

const isNotText = (input) => {
	let regex = /[^A-Za-zÀ-ÖØ-öø-ÿ0-9!?\.,:\ \-|()\'\"]+/
	return {
		value: regex.test(input.value),
		reason: input.value.match(regex)
	}
}

const noImages = (imageArray) => {
	if (imageArray.length === 0) {
		return true
	} else {
		return false
	}
}