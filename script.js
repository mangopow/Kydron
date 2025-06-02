document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener("keyup", () => {
        let searchTerm = searchInput.value.toLowerCase();
        let sections = document.querySelectorAll(".section");

        sections.forEach(section => {
            let header = section.querySelector("h2");
            if (header && header.textContent.toLowerCase().includes(searchTerm)) {
                section.classList.remove("hide"); // Show section if match found
            } else {
                section.classList.add("hide"); // Hide section if no match
            }
        });
    });
});
