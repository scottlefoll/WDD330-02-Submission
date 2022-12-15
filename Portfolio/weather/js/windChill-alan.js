const currentDate = new Date();

const hamButton = document.querySelector(".ham");
const navigation = document.querySelector(".navigation");
const year = document.querySelector(".year");
const lastUpdate = document.querySelector(".updated");

year.textContent = currentDate.getFullYear();

// To display the updated date
try {
	let options = {
		weekday: "long",
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	lastUpdate.textContent = `Last updated on ${currentDate.toDateString("en-us", options)} ${currentDate.toLocaleString(
		"en-us",
	)}`;
} catch (error) {
	alert("Error displaying time update");
}

// TO TOGGLE MENU

const displayList = () => {
	navigation.classList.toggle("responsive");
};

hamButton.addEventListener("click", displayList, false);

window.onresize = () => {
	if (window.innerWidth > 760) navigation.classList.remove("responsive");
};

// DISPLAY A MESSAGE ACORDING TO THE DAY OF THE WEEK

const displayMessage = () => {
	let p = document.createElement("p");
	// let body = document.querySelector(".body");

	p.textContent = "Preston Pancakes in the Park! 9:00 a.m. Saturday at the city park pavilion.";
	p.classList.add("display-message");

	// body.appendChild(p);
	document.body.prepend(p);
};

if (currentDate.getDay() === 5) {
	displayMessage();
}

// console.log("This is the day", currentDate.getDay());

// GET THE INFORMATION FROM THE WEATHER API

const apiURL =
	"https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=3bd28921d4e0f537a8315fdda41b8c8d&units=imperial";

const getData = async () => {
	const response = await fetch(apiURL);
	const data = await response.json();
	// const data = await responses;

	// console.log(data);
	let currently = document.querySelector(".currently");
	let temp = document.querySelector("#temp");
	let humidity = document.querySelector(".humidity");
	let windSpeed = document.querySelector("#wind");

	currently.textContent = data.weather[0].description;
	temp.textContent = data.main.temp;
	humidity.textContent = data.main.humidity;
	windSpeed.textContent = data.wind.speed;
};

getData();

// FORECAST API CALL

const forecastURL =
	"https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=3bd28921d4e0f537a8315fdda41b8c8d&units=imperial";

const getForecast = async () => {
	const resp = await fetch(forecastURL);
	data = await resp.json();
	// console.log(data);

	data.list.filter((value) => {
		if (value.dt_txt.includes("18:00:00")) {
			// console.log(value);

			const forcastFlex = document.querySelector(".forecast-flex");
			const divForecast = document.createElement("div");
			const pDay = document.createElement("p");
			const pIcon = document.createElement("img");
			const ptemp = document.createElement("p");

			// OBTAINING THE LINK OF ICON
			const imagesrc = `https://openweathermap.org/img/w/${value.weather[0].icon}.png`;

			const desc = value.weather[0].description;
			const temp = value.main.temp;

			//GET THE DATE FROM THE API
			const currentDay = value.dt_txt.slice(0, 10);

			// CONVERTING THE STRING TO DATE OBJECT AND SET UTC TIME
			const currentDate = new Date(currentDay).toUTCString();
			// console.log(currentDate);
			// console.log(currentDay);

			// PASSING THE DATE AND THE TEMPERATURE
			pDay.textContent = currentDate.slice(0, 3);
			ptemp.textContent = `${temp} °F`;

			// SET THE ICON'S ATTRIBUTES
			pIcon.setAttribute("alt", desc);
			pIcon.setAttribute("src", imagesrc);

			divForecast.appendChild(pDay);
			divForecast.appendChild(pIcon);
			divForecast.appendChild(ptemp);
			divForecast.classList.add("forecast-box");

			forcastFlex.appendChild(divForecast);
		}
	});
};

getForecast();
