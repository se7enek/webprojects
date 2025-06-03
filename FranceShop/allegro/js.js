var request = new XMLHttpRequest();



request.open('GET', 'https://api.allegro.pl/offers/listing?seller.id=5416', true);


request.setRequestHeader("Access-Control-Allow-Origin", "");
request.setRequestHeader("Access-Control-Allow-Methods", "GET"); // GET, POST, PATCH, PUT, DELETE, OPTIONS');
request.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, Api-Key");

request.setRequestHeader("Accept", "application/vnd.allegro.public.v1+json");
request.setRequestHeader("content-type", "application/vnd.allegro.public.v1+json");
request.setRequestHeader("Authorization", "Bearer 1PRUtX4EoSoKUTQ10OgwtNWgMTwA7Q7LKhkeZkR6Eoh06JRukzv7c4m3OS6y6xvS");
request.setRequestHeader("Api-Key", "714ecb076db749bcb886df0768fed6ff");


request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  data += "Siema";
  
document.getElementById("root").innerHTML = data;
}
/*
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
  // Create a div with a card class
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  // Create the tex an h1 and sett content to the film's title
  const h1 = document.createElement('h1');
  h1.textContent = movie.title;

  // Create a p and set the text content to the film's description
  const p = document.createElement('p');
  movie.description = movie.description.substring(0, 300); // Limit to 300 chars
  p.textContent = `${movie.description}...`; // End with an ellipses

  // Append the cards to the container element
  container.appendChild(card);

  // Each card will contain an h1 and a p
  card.appendChild(h1);
  card.appendChild(p);
});
  } else {
    console.log('error');
  }
*/

request.send();

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);