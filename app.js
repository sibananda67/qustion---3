document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const cafeTable = document.getElementById('cafeTable').getElementsByTagName('tbody')[0];

    const cafesEndpoint = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json';
    const placesEndpoint = 'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json';

    let cafes = [];
    let places = [];

    fetchCafesAndPlaces();

    searchBox.addEventListener('input', function() {
        filterCafes(this.value.trim().toLowerCase());
    });

    async function fetchCafesAndPlaces() {
        try {
            const [cafesResponse, placesResponse] = await Promise.all([
                fetch(cafesEndpoint).then(response => response.json()),
                fetch(placesEndpoint).then(response => response.json())
            ]);

            cafes = cafesResponse.cafes;
            places = placesResponse.places;

            displayCafeList(cafes, places);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function filterCafes(searchTerm) {
        const filteredCafes = cafes.filter(cafe => cafe.name.toLowerCase().includes(searchTerm));
        displayCafeList(filteredCafes, places);
    }

    function displayCafeList(cafes, places) {
        cafeTable.innerHTML = '';

        cafes.forEach(cafe => {
            const place = places.find(place => place.id === cafe.location_id);
            const location = place ? `${place.street_no}, ${place.locality}, ${place.postal_code}` : 'N/A';

            const row = cafeTable.insertRow();
            row.innerHTML = `<td>${cafe.name}</td><td>${location}</td>`;
        });
    }
});