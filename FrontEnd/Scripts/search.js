//import {mapForDB, getMovieDetails} from "FrontEnd/app.js"

// capture where the search values
// put them into an api request from OMDB
//results need to be made into json and array
//nodelist and make elements fro each one

// search dvi will be called

const searchForm = document.querySelector("#user-search")
const searchInput = document.querySelector("input[name='query']")
/*
searchForm.addEventListener("submit", (event) => {
    // prevent deafult
    event.preventDefault()
    console.log("New log")


    const searchTerm = searchInput.value
    console.log(`🔍Searching for: ${searchTerm}`);

    getMovieDetails(searchTerm)
})
*/
const addForm = document.querySelector("#add-section form")
addForm.addEventListener("submit", async (event) => {

    event.preventDefault()
    const searchDiv = document.querySelector("#search-results")

    const title = document.querySelector("#mTitle").value
    const year = document.querySelector("#mYear").value
    const rating = document.querySelector("#rating").value

    console.log(title, year, rating)

    const movieSearchList = await getMovieDetails(title)
    console.log(movieSearchList)

    movieSearchList.Search.forEach(movie => {
        const card = document.createElement("div")

        const img = document.createElement("img")
        img.src = movie.Poster
        img.alt = movie.Title

        const movieTitle = document.createElement("h3")
        movieTitle.textContent = movie.Title

        const myear = document.createElement("p")
        myear.textContent = movie.Year

        card.appendChild(img)
        card.appendChild(movieTitle)
        card.appendChild(myear)
        
        searchDiv.appendChild(card)
    });


})



