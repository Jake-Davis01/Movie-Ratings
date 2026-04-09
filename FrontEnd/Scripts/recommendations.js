const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
console.log("user from localStorage: ", user);

const userId = user?.id || user?.user_id;
console.log("userId: ", userId);

async function loadRecommendations() {
    const container = document.getElementById("recommendations-container");
    container.innerHTML = "<p>Loading your recommendations...</p>";

    try {
        const reviewsRes = await fetch(`http://localhost:3000/reviews/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const reviews = await reviewsRes.json();
        console.log("reviews: ", reviews);

        if (!reviews || reviews.length === 0 || reviews.error) {
            container.innerHTML = "<p>Add some music reviews first to get recommendations!</p>";
            return;
        }

        const recRes = await fetch("http://localhost:3000/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ reviews })
        });

        const data = await recRes.json();
        console.log("recommendations: ", data);

        if (data.recommendations) {
            displayRecommendations(data.recommendations);
        } else {
            container.innerHTML = "<p>Could not load recommendations.</p>";
        }

    } catch (err) {
        console.error("Error:", err);
        container.innerHTML = "<p>Something went wrong.</p>";
    }
}

function displayRecommendations(recommendations) {
    const container = document.getElementById("recommendations-container");
    container.innerHTML = `
        <div class="recommendations-grid">
            ${recommendations.map(rec => `
                <div class="recommendation-card">
                    <h3>${rec.name}</h3>
                    <p><strong>Artist:</strong> ${rec.artist}</p>
                    <p><strong>Album:</strong> ${rec.album}</p>
                    <p><strong>Year:</strong> ${rec.year}</p>
                    <p><strong>Genre:</strong> ${rec.genre}</p>
                    <p class="reason">💡 ${rec.reason}</p>
                </div>
            `).join("")}
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadRecommendations);