const API_URL = "https://song-ratings.onrender.com";
const TEST_USER = 999;

async function getUserReviews() {
    const response = await fetch(`${API_URL}/${TEST_USER}`);
    const data = await response.json();
    //console.log(data)

    const reviewsTable = document.getElementById("reviews");

    data.forEach((review) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${review.image}"></td>
            <td>${review.name}</td>
            <td>${review.album}</td>
            <td>${review.year}</td>
            <td>${review.rating}</td>
            <td>${review.score1}</td>
            <td>${review.score2}</td>
        `;
        reviewsTable.appendChild(row);
    });
}

getUserReviews();
