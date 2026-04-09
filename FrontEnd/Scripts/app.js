// get data from omdb api
//import "dotenv/config"
//const apiKey = process.env.omdb_apikey
const apiKey = "b70d46ec";

// need to find the rotten tomato score first
function mapForDB(data) {
  const rtScore = data.Ratings?.find((r) => r.Source === "Rotten Tomatoes");

  return {
    movie_name: data.Title || "Unknown",
    year: data.Year || "0",
    rating: 0,
    imdb: data.imdbRating || "0.0",
    rotten: rtScore ? rtScore.Value : "N/A",
    image: data.Poster,
    user_id: 999, //need to add the getMe for the session and add this as an or
  };
}

async function getMovieDetails(title, page = 1, year = "") {
  try {
    // make url
    const movieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}&page=${page}&type=movie&y=${year}`;

    // request and capture
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();

    //handle response error
    if (movieData.Response === "False") {
      console.log("Sorry movie not found");
      return "Movie not found ❌";
    }

    console.log("Movie data found! 🎬", movieData);
    //return mapForDB(movieData)
    return movieData;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function selectMovie(imdbID) {
  // use imdbID from attribute on selection, eventlistener on click feeds it to the function
  try {
    const selectedMovieUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    const selectedMovie = await fetch(selectedMovieUrl);
    const movieInfo = await selectedMovie.json();

    // handle error
    if (movieInfo.Response === "False") {
      console.log("Sorry movie not found");
      return "Movie not found ❌";
    }

    console.log("Movie data found! 🎬", movieInfo);
    // will need to change to mapForDB
    return movieInfo;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

/*
const testMovie = await selectMovie("tt0372784");
console.log(testMovie);

/*
export{
    mapForDB,
    getMovieDetails
}
*/
