function searchCountry() {
    var countryName = document.getElementById('countryInput').value;

    if (countryName.trim() !== '') {
        fetchCountryInfo(countryName);
    } else {
        alert('Please enter a country name.');
    }
}

function fetchCountryInfo(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            displayCountryInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Country not found. Please try again.');
        });
}

function displayCountryInfo(countryData) {
    var countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = '';

    if (countryData.length > 0) {
        var country = countryData[0];

        var html = `
        <div class="card ">
            <img src="${country.flags.png}" class="card-img-top " alt="Flag" style="width: 30%" />
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <h5 class="card-title">${country.name.eesti}</h5>
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text"><strong>Capital:</strong> ${country.capital}</p>
                <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p class="card-text"><strong>Subregion:</strong> ${country.subregion}</p>
                <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                <p class="card-text"><strong>Currency:</strong> ${country.currencies[Object.keys(country.currencies)[0]].name} (${country.currencies[Object.keys(country.currencies)[0]].symbol})</p>
                <p class="card-text"><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
            </div>
            <div class="card-body">
                <a href="${country.maps.googleMaps}" class="card-link" target="_blank">Open Google Maps</a>
                <a href="${country.maps.openStreetMaps}" class="card-link" target="_blank">Open OpenStreetMaps</a>
            </div>
        </div>
    `;

        countryInfoDiv.innerHTML = html;
    } else {
        alert('Country not found. Please try again.');
    }
}