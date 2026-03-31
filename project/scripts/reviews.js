const params = new URLSearchParams(window.location.search);

document.getElementById('destination').textContent = params.get('product');
document.getElementById('traveler').textContent = params.get('traveler');
document.getElementById('visitdate').textContent = params.get('visitdate');
document.getElementById('activities').textContent = params.getAll('activities').join(', ');
document.getElementById('comments').textContent = params.get('comments');