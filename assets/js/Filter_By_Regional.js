var countriesData; // Store all countries data

    function filterCountriesByRegion() {
        var selectedRegion = document.getElementById('regionDropdown').value;

        if (selectedRegion.trim() === '') {
            alert('Please select a region.');
            return;
        }

        fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data => {
                countriesData = data;
                var filteredCountries = countriesData.filter(country => country.region === selectedRegion);
                displayFilteredCountries(filteredCountries);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch country data. Please try again.');
            });
    }

    function displayFilteredCountries(filteredCountries) {
        var filteredCountriesDiv = document.getElementById('filteredCountries');
        filteredCountriesDiv.innerHTML = '';

        if (filteredCountries.length > 0) {
            filteredCountries.forEach(country => {
                var countryCard = document.createElement('div');
                countryCard.classList.add('country-card');

                countryCard.innerHTML = `
                    <h5>${country.name.common}</h5>
                    <img src="${country.flags.png}" alt="Flag" class="country-flag">
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                `;

                // Add click event listener to each country card
                countryCard.addEventListener('click', function () {
                    showCountryDetails(country);
                });

                filteredCountriesDiv.appendChild(countryCard);
            });
        } else {
            alert('No countries found in the selected region.');
        }
    }

    function showCountryDetails(country) {
    var countryDetailsHTML = `
        <h3>${country.name.common}</h3>
        <img src="${country.flags.png}" alt="Flag" class="country-flag">
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Currency:</strong> ${country.currencies[Object.keys(country.currencies)[0]].name} (${country.currencies[Object.keys(country.currencies)[0]].symbol})</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Area:</strong> ${country.area} sq km</p>
        <p><strong>Landlocked:</strong> ${country.landlocked ? 'Yes' : 'No'}</p>
        <p><strong>Borders:</strong> ${country.borders.join(', ')}</p>
        <p><strong>Demonym:</strong> ${country.demonym}</p>
        <p class="card-text"><strong>Timezone:</strong> ${Array.isArray(country.timezones) && country.timezones.length > 0 ? country.timezones.join(', ') : 'N/A'}</p>
        <p><strong>Google Maps:</strong> <a href="${country.maps.googleMaps}" target="_blank">Open Google Maps</a></p>
        <p><strong>OpenStreetMaps:</strong> <a href="${country.maps.openStreetMaps}" target="_blank">Open OpenStreetMaps</a></p>
    `;

    document.getElementById('countryDetailsContent').innerHTML = countryDetailsHTML;
    
    var modal = new bootstrap.Modal(document.getElementById('countryDetailsModal'));
    modal.show();
    }