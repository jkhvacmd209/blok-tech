const locationInput = document.getElementById('location')

let autocomplete
let place

function initAutocomplete() {

	autocomplete = new google.maps.places.Autocomplete(

		locationInput, {
			types: [],
			componentRestrictions: { 'country': ['NL'] },
			fields: ['formatted_address', 'geometry'],

		})

	autocomplete.addListener('place_changed', () => {

		place = autocomplete.getPlace()

		if (!place.geometry) {
			// The user did not input a location
			locationInput.style.borderColor = 'red'
		} else {
			// The user did input a location
			locationInput.style.borderColor = 'green'
			locationInput.value = place.formatted_address
		}

	})
}