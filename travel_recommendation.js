let data = {};

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(result => {
        data = result;
    });

function displayResults(list) {
    let output = "";

    list.forEach(item => {
        output += `
            <div class="card">
                <img src="${item.imageUrl}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = output;
}

function search() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let results = [];

    if (keyword.includes("beach")) {
        results = data.beaches;
    } 
    else if (keyword.includes("temple")) {
        results = data.temples;
    } 
    else if (keyword.includes("country")) {
        data.countries.forEach(country => {
            results = results.concat(country.cities);
        });
    }

    displayResults(results);
}

function clearResults() {
    document.getElementById("results").innerHTML = "";
}