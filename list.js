let musicData = []; // Store parsed data for sorting
let sortDirection = { name: true, year: true }; // Track sorting direction

async function loadFile() {
    try {
        const response = await fetch('data.txt');
        const text = await response.text();
        const sections = text.split(/\n\s*\n/); // Splitting sections by double line break
        
        musicData = sections.map(section => {
            const lines = section.split('\n');
            let data = {};
            
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    data[key.trim()] = value.trim();
                }
            });

            return data;
        });

        displayMusic(musicData);
    } catch (error) {
        console.error("Error loading file:", error);
    }
}

function displayMusic(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = data.map(entry => `
        <div class="section">
            <img src="${entry.ID}.jpg" alt="${entry.Name}">
            <h2>${entry.Name}</h2>
            <p>${entry.Artist}</p>
            <img id="down" src="Download.jpg">
        </div>
    `).join('');
}

// Toggle sorting direction each time button is clicked
function sortByName() {
    musicData.sort((a, b) => sortDirection.name ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name));
    sortDirection.name = !sortDirection.name;
    displayMusic(musicData);
}

function sortByYear() {
    musicData.sort((a, b) => {
        const yearA = parseInt(a.Artist.match(/\((\d+)\)/)?.[1] || 0);
        const yearB = parseInt(b.Artist.match(/\((\d+)\)/)?.[1] || 0);
        return sortDirection.year ? yearA - yearB : yearB - yearA;
    });
    sortDirection.year = !sortDirection.year;
    displayMusic(musicData);
}

// Load data when page is ready
document.addEventListener("DOMContentLoaded", loadFile);
