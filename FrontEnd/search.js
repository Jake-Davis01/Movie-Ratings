//import {mapForDB, getMovieDetails} from "FrontEnd/app.js"

// capture where the search values
// put them into an api request from OMDB
//results need to be made into json and array
//nodelist and make elements fro each one

// search dvi will be called

const searchForm = document.querySelector("#user-search")
const searchInput = document.querySelector("input[name='query']")

searchForm.addEventListener("submit", (event) => {
    // prevent deafult
    event.preventDefault()


    const searchTerm = searchInput.value
    console.log(`🔍Searching for: ${searchTerm}`);

    getMovieDetails(searchTerm)
})