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
        <div class="row">
            <div class="col-md-6 col-lg-5 col-sm-12">
                <img src="${country.flags.png}" class="card-img-top img-fluid" alt="Flag" style="max-width: 100%;" />
            </div>
            <div class="col-md-6 col-lg-7 col-sm-12">
                <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text"><strong>Regional Name:</strong> ${country.region}</p>
                <p class="card-text"><strong>Country Code:</strong> ${country.cca2}</p>
                <p class="card-text"><strong>Currency:</strong> ${country.currencies[Object.keys(country.currencies)[0]].name} (${country.currencies[Object.keys(country.currencies)[0]].symbol})</p>
                <p class="card-text"><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                <p class="card-text"><strong>Capital City:</strong> ${country.capital}</p>
                <p class="card-text"><strong>Calling Code:</strong> +${country.callingCode}</p>
                <p class="card-text"><strong>Subregional:</strong> ${country.subregion}</p>
                <p class="card-text"><strong>Timezone:</strong> ${Array.isArray(country.timezones) && country.timezones.length > 0 ? country.timezones.join(', ') : 'N/A'}</p>
                <p class="card-text"><strong>Area:</strong> ${country.area.toLocaleString()} sq km</p>
                <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p class="card-text"><strong>Latitude/Longitude:</strong> ${country.latlng.join(', ')}</p>
                </div>
                <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${country.maps.googleMaps}" class="btn  btn-outline-dark" target="_blank">Open Google Maps</a>
                    </div>
                    <div class="col-md-6">
                        <a href="${country.maps.openStreetMaps}" class="btn  btn-outline-dark" target="_blank">Open OpenStreetMaps</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
`;


        countryInfoDiv.innerHTML = html;
    } else {
        alert('Country not found. Please try again.');
    }
}