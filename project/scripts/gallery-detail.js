import { locations } from "./data.js";

const detailsContainer = document.querySelector("#details-grid");
let savedItems = JSON.parse(localStorage.getItem("dreamscapeFavs")) || [];

function showLocationDetails() {
    if (!detailsContainer) return;
    
    detailsContainer.innerHTML = "";

    locations.forEach(place => {
        const isFavorite = savedItems.includes(place.id);

        const detailCard = document.createElement("article");
        detailCard.className = "detail-card";
        
        detailCard.innerHTML = `
            <img src="${place.img}" alt="${place.name}" loading="lazy" width="500" height="300">
            <div class="detail-content">
                <span class="card-tag">${place.cat}</span>
                <h3>${place.name}</h3>
                <p>${place.desc}</p>
                <p><strong>Top Season:</strong> ${place.bestSeason || "All year"}</p>
                <p><strong>Common Activities:</strong> ${place.activities || "Exploring and Sightseeing"}</p>
                <button class="favorite-toggle ${isFavorite ? 'active' : ''}" data-id="${place.id}">
                    ${isFavorite ? "❤️ Saved" : "🤍 Save to Favorites"}
                </button>
            </div>
        `;
        detailsContainer.appendChild(detailCard);
    });
}

if (detailsContainer) {
    detailsContainer.addEventListener("click", function(event) {
        const toggleBtn = event.target.closest(".favorite-toggle");
        if (!toggleBtn) return;

        const placeId = toggleBtn.getAttribute("data-id");
        const foundIndex = savedItems.indexOf(placeId);

        if (foundIndex !== -1) {
            savedItems.splice(foundIndex, 1);
        } else {
            savedItems.push(placeId);
        }

        localStorage.setItem("dreamscapeFavs", JSON.stringify(savedItems));
        showLocationDetails();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    showLocationDetails();
});