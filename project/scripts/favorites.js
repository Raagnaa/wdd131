import { locations } from "./data.js";

let userFavorites = JSON.parse(localStorage.getItem("dreamscapeFavs")) || [];
const favsContainer = document.querySelector("#favorites-grid");

function displayFavorites() {
    if (!favsContainer) return;
    
    favsContainer.innerHTML = "";

    if (userFavorites.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your favorites list is currently empty. Visit the gallery to add some destinations!";
        favsContainer.appendChild(emptyMessage);
        return;
    }

    const matchedLocations = locations.filter(item => userFavorites.includes(item.id));

    matchedLocations.forEach(place => {
        const favCard = document.createElement("article");
        favCard.className = "card";
        
        favCard.innerHTML = `
            <img src="${place.img}" alt="${place.name}" loading="lazy" width="400" height="250">
            <div class="card-content">
                <span class="card-tag">${place.cat}</span>
                <h3>${place.name}</h3>
                <p>${place.desc}</p>
                <button class="remove-btn active" data-id="${place.id}">❤️ Remove from Favorites</button>
            </div>
        `;
        favsContainer.appendChild(favCard);
    });
}

if (favsContainer) {
    favsContainer.addEventListener("click", function(e) {
        const deleteBtn = e.target.closest(".remove-btn");
        if (!deleteBtn) return;

        const selectedId = deleteBtn.getAttribute("data-id");
        
        userFavorites = userFavorites.filter(id => id !== selectedId);
        
        localStorage.setItem("dreamscapeFavs", JSON.stringify(userFavorites));
        displayFavorites();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayFavorites();
});