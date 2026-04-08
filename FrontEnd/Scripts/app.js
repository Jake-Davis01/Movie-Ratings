// get data from omdb api
//import "dotenv/config"
//const apiKey = process.env.omdb_apikey
const apiKey = "b70d46ec"

// need to find the rotten tomato score first
function mapForDB(data) { 
    const rtScore = data.Ratings?.find(r => r.Source === "Rotten Tomatoes")

    return {
        movie_name: data.Title || "Unknown",
        year: data.Year || "0",
        rating: 0,
        imdb: data.imdbRating || "0.0",
        rotten: rtScore ? rtScore.Value : "N/A",
        image: data.Poster,
        user_id: 999 //need to add the getMe for the session and add this as an or

    }
}

async function getMovieDetails(title) {
    try {
        // make url
        const movieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`

        // request and capture
        const movieResponse = await fetch(movieUrl)
        const movieData = await movieResponse.json()

        //handle response error
        if (movieData.Response === "False") {
            console.log("Sorry movie not found")
            return "Movie not found ❌"
        }

        

        console.log("Movie data found! 🎬", movieData)
        //return mapForDB(movieData)
        return movieData

    } catch (err) {
        console.error(`Error: ${err}`)
    }   
}

/*
export{
    mapForDB,
    getMovieDetails
}
*/