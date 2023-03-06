const uploadInput = document.querySelector('input[type=file]')
const imageList = document.querySelector('.image-list')

let images = []

uploadInput.style.color = 'transparent'
uploadInput.style.backgroundImage = 'url(./img/add-image.png)'

uploadInput.addEventListener('change', () => {

	if (uploadInput.files.length == 0) {
		return
	}

	for (let i = 0; i < uploadInput.files.length; i++) {
		images.push(uploadInput.files[i])
	}
	updateImages()
})

const updateImages = () => {

	let imageListElements = ''

	for (let i = 0; i < images.length; i++) {
		imageListElements += `
		<div class="upload-image-container">
			<img src="${URL.createObjectURL(images[i])}" alt="${images[i].name}"/ >
			<button type="button" data-index="${i}" onclick="deleteImage(this.dataset.index)">✕</button>
		</div>
		`
	}

	imageList.innerHTML = imageListElements

}

const deleteImage = (i) => {
	images.splice(i, 1)
	updateImages()
}