const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

// document.div.cards.display = 'grid';
// document.div.cards.gridTemplateColumns = '1fr 1fr 1fr 1fr';
// document.div.cards.gridGap = '1rem';

fetch(requestURL)
	.then(function(response) {
		return response.json();
	})
	.then(function(jsonObject) {
		console.table(jsonObject); // temporary checking for valid response and data parsing
		const prophets = jsonObject['prophets'];
    
		col = 1
		for (let i = 0; i < prophets.length; i++) {
        if (col > 4) {col = 1}
        
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        let p5 = document.createElement('p');
        let img1 = document.createElement('img');
        p1.className = 'birthdate';
        p5.className = 'birthplace';
        h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
        p1.textContent = 'Date of Birth: ' + prophets[i].birthdate;
        p2.textContent = 'Date of Death: ' + prophets[i].death;
        p3.textContent = 'Length: ' + prophets[i].length + ' years';
        p4.textContent = 'Order: ' + prophets[i].order;
        p5.textContent = 'Place of Birth: ' + prophets[i].birthplace;
        img1.setAttribute('src', prophets[i].imageurl);
        img1.setAttribute('alt', prophets[i].name + ' ' + prophets[i].lastname + " - " + prophets[i].order);
        img1.setAttribute('width', "200px");
        img1.setAttribute('height', "250px");
        card.appendChild(h2);
        card.appendChild(p1);
        card.appendChild(p5);
        card.appendChild(img1);
      
        card.setAttribute('border', '1');
        card.style.border = "thin dashed #000000"
        card.style.backgroundColor = "#E6E6FA";
        card.style.width = '350px';
        card.style.margin = '10px';

        document.querySelector('div.cards').appendChild(card);
        card.style.display = 'grid';
        card.style.gridColumn = col;
        col += 1;
		}
	});

