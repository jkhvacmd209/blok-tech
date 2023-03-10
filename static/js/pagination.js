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



//set default step visibility

goToStep(1)



//go to next step
nextButton.addEventListener('click', () => {

	switch (currentStep) {
		case 1:

			goToStep(2)

			break

		case 2:

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

	switch (currentStep) {
		case 2:

			goToStep(1)

			break

		case 3:

			goToStep(2)

			break

		case 4:

			goToStep(3)

			break

		case 5:

			goToStep(4)

			break
	}


})