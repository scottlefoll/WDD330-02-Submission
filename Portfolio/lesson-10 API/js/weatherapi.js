const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=224ba8d85cc913fa45e35d9a865e6bcb";

fetch(apiURL)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		let span = document.querySelector("#current-temp");
		let imgsrc = document.querySelector("#imagesrc");
		let icon = document.querySelector("#icon");

		const imagesrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
		const desc = data.weather[0].description;
		icon.setAttribute("alt", desc);
		icon.setAttribute("src", imagesrc);

		span.textContent = data.main.temp;

		imgsrc.textContent = imagesrc;

		icon.textContent = imgsrc.textContent;
	});
