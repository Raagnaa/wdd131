import { locations } from "./data.js";

const galleryContainer = document.querySelector("#landscape-grid");
const filterNav = document.querySelector("#gallery-filters");

let favoritePlaces = JSON.parse(localStorage.getItem("dreamscapeFavs")) || [];

function renderLocationCards(filteredList) {
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = "";

    const cardFragment = document.createDocumentFragment();

    filteredList.forEach(place => {
        const isAlreadyFav = favoritePlaces.includes(place.id);

        const cardElement = document.createElement('article');
        cardElement.className = 'card';
        
        cardElement.innerHTML = `
            <img src="${place.img}" alt="${place.name} view" loading="lazy" width="400" height="250" onerror="this.src='images/fallback.webp'">
            <div class="card-content">
                <span class="card-category">${place.cat}</span>
                <h3>${place.name}</h3>
                <p>${place.desc}</p>
                <button class="fav-button ${isAlreadyFav ? 'active' : ''}" data-id="${place.id}" aria-pressed="${isAlreadyFav}">
                    ${isAlreadyFav ? "❤️ Saved" : "🤍 Save to Favorites"}
                </button>
            </div>
        `;
        cardFragment.appendChild(cardElement);
    });

    galleryContainer.appendChild(cardFragment);
}

if (galleryContainer) {
    galleryContainer.addEventListener('click', function(event) {
        const clickedBtn = event.target.closest('.fav-button');
        if (!clickedBtn) return;

        const locationId = clickedBtn.dataset.id;
        const listIndex = favoritePlaces.indexOf(locationId);

        if (listIndex !== -1) {
            favoritePlaces.splice(listIndex, 1);
            clickedBtn.classList.remove('active');
            clickedBtn.innerHTML = "🤍 Save to Favorites";
            clickedBtn.setAttribute('aria-pressed', 'false');
        } else {
            favoritePlaces.push(locationId);
            clickedBtn.classList.add('active');
            clickedBtn.innerHTML = "❤️ Saved";
            clickedBtn.setAttribute('aria-pressed', 'true');
        }

        localStorage.setItem("dreamscapeFavs", JSON.stringify(favoritePlaces));
    });
}

if (filterNav) {
    const filterButtons = filterNav.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterNav.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-filter");
            
            const results = (selectedCategory === "all") 
                ? locations 
                : locations.filter(item => item.cat === selectedCategory);
            
            renderLocationCards(results);
        });
    });
}

const mainForm = document.querySelector("#contact-form");
if (mainForm) {
    mainForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const userName = document.querySelector('#contact-name')?.value || 'Guest';
        alert("Thanks for reaching out, " + userName + "! This is a demo form.");
        mainForm.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderLocationCards(locations);
});