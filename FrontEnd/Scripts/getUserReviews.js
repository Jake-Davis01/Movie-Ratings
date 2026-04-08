const API_URL = "http://localhost:3000/reviews"
const TEST_USER = 369

async function getUserReviews() {
    const response = await fetch(`${API_URL}/${TEST_USER}`)
    const data = await response.json()
    //console.log(data)

    const reviewsTable = document.getElementById("reviews")

    data.forEach(review => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td><img src="${review.image}"> ${review.movie_name}</td>
            <td>${review.year}</td>
            <td>${review.rating}</td>
            <td>${review.imdb}</td>
            <td>${review.rotten}</td>
        `
        reviewsTable.appendChild(row)
    })
}

getUserReviews()