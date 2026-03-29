let data = {};

// ✅ LOAD JSON DATA
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(result => {
        data = result;
        console.log("Data loaded:", data);
    })
    .catch(error => {
        console.log("Error loading JSON:", error);
    });


// ✅ SEARCH FUNCTION
function search() {
    let keyword = document.getElementById("searchInput").value.toLowerCase().trim();

    let results = [];

    // 🔍 BEACH
    if (keyword.includes("beach")) {
        results = data.beaches;
    }

    // 🔍 TEMPLE
    else if (keyword.includes("temple")) {
        results = data.temples;
    }

    // 🔍 COUNTRY (nested cities)
    else if (keyword.includes("country")) {
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }

    else {
        alert("Please enter: beach, temple, or country");
        return;
    }

    displayResults(results);
}


// ✅ DISPLAY RESULTS
function displayResults(list) {
    let output = "";

    if (!list || list.length === 0) {
        document.getElementById("results").innerHTML = "<p>No results found</p>";
        return;
    }

    list.forEach(item => {
        output += `
            <div class="card">
                <img src="${item.imageUrl}" width="100%">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = output;
}


// ✅ CLEAR BUTTON
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}