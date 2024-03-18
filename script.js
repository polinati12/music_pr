let ul = document.querySelector("ul")
let audioPlayer = document.getElementById("audioPlayer");
let audioSource = document.getElementById("audioSource");
let input = document.querySelector("input")
let form = document.querySelector("form")
audioPlayer.volume = 0.2

let url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=українські';
let options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '642ed41de6msh1eeae3dca9c23dep1db313jsn1b41cee3dae7',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

async function get(url) {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result)
		return result
	} catch (error) {
		console.error(error);
	}
}

get(url).then(result => render(result.data))

function render(data) { 
	console.log(data)
	data.forEach(el => {
		ul.innerHTML += `
		<li data-id="${el.preview}">
			<p>${el.artist.name} - ${el.title}</p>
			<button id="play">Play</button>
		</li>`
	})
}

ul.addEventListener("click", (event) => {
	let song = event.target.closest("li")
	let playBtn = event.target.closest("#play")
	if (song && playBtn) {
		audioPlayer.style.bottom = "20px"

		audioSource.src = song.dataset.id;
		audioPlayer.load();
		audioPlayer.play();
	}
})

form.addEventListener("submit", (event) => {
	event.preventDefault()

	if (input.value.length <= 3) {
		alert("Мало символів ввели")
	} else {
		ul.innerHTML = ""
		let url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${input.value}`;
		get(url).then(result => render(result.data))
	}
})