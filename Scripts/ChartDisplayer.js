const countriesURL = 'https://restcountries.com/v2/all'
const countriesChartDiv = document.getElementById('countries-chart-div')

const presetBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
], presetBorderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
], presetBorderWidth = 1

let countries, countriesArray = [], countriesPopulation, languageMap = new Map(), countriesLanguage
let myChart

const ctx = document.getElementById('population-chart');
const btnDiv = document.createElement('div')

const fetchCountries = async() => {
    try {
        const response = await fetch(countriesURL)
        countries = await response.json()

    } catch (err) {
        console.error(err)
    }
}

const displayPopulation = () => {

    if (myChart) { myChart.destroy() }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countriesPopulation.map(a => a.name),
            datasets: [{
                label: 'Population',
                data: countriesPopulation.map(a => a.population),
                backgroundColor: presetBackgroundColors,
                borderColor: presetBorderColors,
                borderWidth: presetBorderWidth
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const displayLanguage = () => {

    if (myChart) { myChart.destroy() }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countriesLanguage.map(a => a[0]),
            datasets: [{
                label: 'Language Spoken in X countries',
                data: countriesLanguage.map(a => a[1]),
                backgroundColor: presetBackgroundColors,
                borderColor: presetBorderColors,
                borderWidth: presetBorderWidth
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

fetchCountries().then(() => {
    countriesArray = Object.values(countries)
    worldClass = {
        name: 'World',
        population: Object.keys(countries).reduce((prev, key) => prev+parseInt(countries[key].population), 0)
    }
    countriesArray.unshift(worldClass)
    countriesArray.sort((a,b) => {return b.population - a.population})
    countriesPopulation = countriesArray.slice(0, 10) // Top 6 countries in population
}).then(() => {
    const populationBtn = document.createElement('button')
    populationBtn.type = 'button'
    populationBtn.onclick = displayPopulation
    populationBtn.innerHTML = "Display Population Data"
    countriesChartDiv.appendChild(populationBtn)
}).then(() => {
    let ln
    countriesArray.shift()
    countriesArray.forEach((country) => {
        country.languages.forEach((language) => {
            ln = language.name
            if (languageMap.has(ln)) languageMap.set(ln, languageMap.get(ln)+1)
            else languageMap.set(ln, 1)
        })
    })
    countriesLanguage = [...languageMap.entries()].sort((a, b) => {return b[1]- a[1]}).slice(0,10)

}).then(() => {
    const languageBtn = document.createElement('button')
    languageBtn.type = 'button'
    languageBtn.onclick = displayLanguage
    languageBtn.innerHTML = "Display Language Data"
    countriesChartDiv.appendChild(languageBtn)
})




