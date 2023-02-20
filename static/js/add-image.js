uploadInputs = document.querySelectorAll('input[type=file]');

uploadInputs.forEach((input) => {

	input.style.color = 'transparent';

	input.addEventListener('change', (e) => {

		if (input.files.length == 0) {
			input.style.backgroundImage = 'url(./img/add-image.png)';
			input.style.backgroundSize = '30%';
		} else {
			input.style.backgroundImage = 'url(' + URL.createObjectURL(input.files[0]) + ')';
			input.style.backgroundSize = 'cover';
		}

	})

});