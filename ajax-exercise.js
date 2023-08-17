import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  axios.get('https://dog.ceo/api/breeds/image/random')
    .then(res => {
      console.log(res)
      document.getElementById('dog-image').innerHTML = `
      <img src='${res.data.message}'/>`
    })
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;

  const url = `/weather.txt?zipcode=${zipcode}`;
  const response = await axios.get(url);
  document.querySelector("#weather-info").innerText = response.data;
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault();

  const cookieType = document.querySelector('#cookie-type-field').value;
  const qty = document.querySelector('#qty-field').value;
  const response = await axios.post(
    '/order-cookies.json',
    {cookieType: cookieType, qty: qty}
  );

  const orderStatusDiv = document.querySelector("#order-status");
  orderStatusDiv.innerText = response.data.message;
  if (response.data.resultCode === "ERROR") {
    orderStatusDiv.classList.add('order-error');
  }
  else {
    orderStatusDiv.classList.remove('order-error');
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  const response = await axios.get(url);
  let displayString = "";
  for (const result of response.data.results) {
    displayString += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`;
  }
  document.querySelector("#itunes-results").innerHTML = displayString;
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
