const spots = [
    { name: "H&M - NEX", category: "recycle", distance: 2.5 },
    { name: "Greensquare - Viva Business Mall", category: "recycle", distance: 10 },
    { name: "Greensquare - Funan", category: "recycle", distance: 11 },
    { name: "Cash Converters - Toa Payoh", category: "repair", distance: 8 },
    { name: "PC Dreams", category: "repair", distance: 10 },
    { name: "The Salvation Army - Tanglin", category: "donate", distance: 12 },
    { name: "The Helping Hand", category: "donate", distance: 1.5 },
    { name: "ItsRainingRaincoats", category: "donate", distance: 3 },
    { name: "MINDS - Woodlands", category: "donate", distance: 15 }
];

function renderSpots(filter = "all") {
    const container = document.getElementById("spots-container");
    container.innerHTML = "";
    const filteredSpots = filter === "all" ? spots : spots.filter(spot => spot.category === filter);
    
    filteredSpots.forEach(spot => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h3>${spot.name}</h3><p>Category: ${spot.category}</p><p class="distance">Distance: ${spot.distance} km</p>`;
        container.appendChild(card);
    });
}

function filterSpots(category) {
    renderSpots(category);
}

function sortByDistance() {
    spots.sort((a, b) => a.distance - b.distance);
    renderSpots();
}

document.addEventListener("DOMContentLoaded", () => renderSpots());
