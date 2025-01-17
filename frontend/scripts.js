const priceTable = document.getElementById("priceTable");
const alertForm = document.getElementById("alertForm");

const API_BASE_URL = "http://localhost:3000/api";

// Fetch real-time prices
async function fetchPrices() {
    try {
        const response = await fetch(`${API_BASE_URL}/prices`);
        const data = await response.json();
        console.log(data);
        populatePriceTable(data);
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

// Populate the price table
function populatePriceTable(prices) {

    for ( const crypto in prices) {
        const priceData = prices[crypto];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${crypto}</td>
            <td>${priceData.usd}</td>
        `;
        priceTable.appendChild(row);
    }
}

// Handle alert form submission
alertForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cryptoSymbol = document.getElementById("cryptoSymbol").value.toUpperCase();
    const threshold = parseFloat(document.getElementById("threshold").value);
    const direction = document.getElementById("direction").value;

    try {
        const response = await fetch(`${API_BASE_URL}/alerts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: "testUser", // Replace with actual user ID if available
                symbol: cryptoSymbol,
                threshold,
                direction,
            }),
        });

        const data = await response.json();
        alert(data.message || "Alert set successfully!");
    } catch (error) {
        console.error("Error setting alert:", error);
    }
});

// Fetch prices initially and refresh every 10 seconds
fetchPrices();
// setInterval(fetchPrices, 10000);