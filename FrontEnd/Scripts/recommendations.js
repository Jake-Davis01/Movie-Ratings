const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
console.log("user from localStorage: ", user)

async function loadRecommendations() {
    const container = document.getElementById("recommendations-container");
    container.innerHTML = "<p>Loading your recommendations...</p>";

    try {
        // get user's movie reviews
        const reviewsRes = await fetch(`http://localhost:3000/reviews/${user.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const reviews = await reviewsRes.json();

        if (!reviews || reviews.length === 0) {
            container.innerHTML = "<p>Add some movie reviews first to get recommendations!</p>";
            return;
        }

        // send to Claude
        const recRes = await fetch("http://localhost:3000/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ reviews })
        });

        const data = await recRes.json();

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
                    <h3>${rec.movie_name} (${rec.year})</h3>
                    <p><strong>Genre:</strong> ${rec.genre}</p>
                    <p class="reason">💡 ${rec.reason}</p>
                </div>
            `).join("")}
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", loadRecommendations);