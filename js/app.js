
const container = document.querySelector('.container');
const result = document.querySelector('#result');
const form = document.querySelector('#form');

window.addEventListener('load', () => {
    form.addEventListener('submit',  searchWeather);
})

// Search Weather 
function searchWeather(e) {
    e.preventDefault();
    const city = document.querySelector('#city').value
    const country = document.querySelector('#country').value
    console.log(city);
    console.log(country);

    //validación 
    if(city === '' || country === '') {
        // error
        showError('Completa los campos obligatorios')
        return;
    }
    consultAPI(city, country);
}

function showError(mensaje) {
  const alert = document.querySelector('.bg-red-100');
  if(!alert) {
      const alert = document.createElement('div');
      alert.classList.add('bg-red-300', "border-red-400", "text-center", "text-red-900", "px-4", "py-3", "relative", "max-w-md", "mx-auto", "mt-6", "rounded" );
      alert.innerHTML = `
          <span class="font-bold">Error!</span>
          <span class="block sm:inline">${mensaje}</span>
      `;
      container.appendChild(alert);
      setTimeout(() => {
          alert.remove();
      }, 2000);
  }
}


 // Show weather 
function showWeather(data) {

  const { name, main: { temp, temp_max, temp_min, humidity } } = data;

  const degrees = celsiusCentrigrade(temp);
  const min = celsiusCentrigrade(temp_max);
  const max = celsiusCentrigrade(temp_min);
  const hum = (humidity);

  const currentCity = document.createElement('h2');
  currentCity.innerHTML = `El clima en ${name} es de : `;
  currentCity.classList.add('font-bold', 'text-2xl')

  const currentTemp = document.createElement('p');
  currentTemp.innerHTML = `${degrees} &#8451;`;
  currentTemp.classList.add('font-bold', 'text-6xl')

  const maxTemp = document.createElement('p');
  maxTemp.innerHTML = `Max : ${max} &#8451;`;
  maxTemp.classList.add('text-xl')

  const minTemp = document.createElement('p');
  minTemp.innerHTML = `Min : ${min} &#8451;`;
  minTemp.classList.add('text-xl')

  const humWeather =  document.createElement('p');
  humWeather.innerHTML = `Hum : ${hum} %`;
  humWeather.classList.add('text-x1');

  const informationDiv = document.createElement('div');
  informationDiv.classList.add('text-center', 'text-white')
  informationDiv.appendChild(currentCity);
  informationDiv.appendChild(currentTemp);
  informationDiv.appendChild(maxTemp);
  informationDiv.appendChild(minTemp);
  informationDiv.appendChild(humWeather);

  result.appendChild(informationDiv)
}

//consult API and print the result
function consultAPI(city, country ) {
  const apiKey = '129faee17b0fd6e0b77dbc8cff4c53d8';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`; // add APi key at the end

  // query using fetch 
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      cleanHTML();
      if(data.code === "404") {
        showError('Could not find results')
      } else {
        showWeather(data)
      }
    })
    .catch(error => {
      console.log(error)
      alert('Could not find results');
    });
}

// convert Kelvin degrees to Celsius
function celsiusCentrigrade(degrees) {
  return parseInt( degrees - 273.15);
  }
  
// clean HTML
function cleanHTML() {
  while(result.firstChild) {
      result.removeChild(result.firstChild);
  }
}
