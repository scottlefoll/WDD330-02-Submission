
// LESSON 5 JAVASCRIPT
const urlData = "https://byui-cit230.github.io/weather/data/towndata.json";

// FETCH API

let towns = [];

const output = (towns) => {
	towns.map((town, index) => {
		console.log(index);
		console.log(town);
		
		// alert(JSON.stringify(town, null, 4));

        if (index === 0) {
            document.getElementById("soda-founded").textContent = town.yearFounded;
            document.getElementById("soda-pop").textContent = town.currentPopulation;
            document.getElementById("soda-rain").textContent = town.averageRainfall;
        }

        if (index === 2) {
            document.getElementById("fish-founded").textContent = town.yearFounded;
            document.getElementById("fish-pop").textContent = town.currentPopulation;
            document.getElementById("fish-rain").textContent = town.averageRainfall;
        }

        if (index === 6) {
            document.getElementById("preston-founded").textContent = town.yearFounded;
            document.getElementById("preston-pop").textContent = town.currentPopulation;
            document.getElementById("preston-rain").textContent = town.averageRainfall;
        }

		
	});
};

const getData = async () => {
	const response = await fetch(urlData);
	// console.log(response);
	const data = await response.json();
	console.log(data);
	towns = data.towns;
	output(towns);
};

getData();

