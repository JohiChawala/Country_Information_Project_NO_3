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
            <div class="country-card">
                <h2>${country.name.common}</h2>
                <img src="${country.flags.png}" alt="Flag" class="country-flag">
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <!-- Add more information as needed -->
            </div>
        `;

        countryInfoDiv.innerHTML = html;
    } else {
        alert('Country not found. Please try again.');
    }
}