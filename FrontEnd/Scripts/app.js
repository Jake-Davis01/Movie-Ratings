// get data from omdb api
//import "dotenv/config"
//const apiKey = process.env.omdb_apikey
const movies_apiKey = "b70d46ec";
const lastfm_apikey = "a7779a9ec86f0bd4c472d391e5e3243f";
const lastfm_route = " http://ws.audioscrobbler.com/2.0";

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
    const movieUrl = `http://www.omdbapi.com/?apikey=${movies_apiKey}&s=${title}&page=${page}&type=movie&y=${year}`;

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
    const selectedMovieUrl = `http://www.omdbapi.com/?apikey=${movies_apiKey}&i=${imdbID}`;

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

async function searchSong(song, page = 1, artist = "") {
  try {
    // make URL
    const searchUrl = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${song}&page=${page}&api_key=${lastfm_apikey}&format=json`;
    console.log(searchUrl);
    // request and capture
    const searchResp = await fetch(searchUrl);
    const searchList = await searchResp.json();

    if (!searchList.results?.trackmatches?.track) {
      console.log("Sorry no songs found");
      return "Songs not found 👎";
    }

    const songs = searchList.results;

    console.log("Song data found! 🎶", songs);
    return songs;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
/*
const testSong = await searchSong("happy");
console.log(testSong.trackmatches.track);
/*
const testMovie = await selectMovie("tt0372784");
console.log(testMovie);

/*
export{
    mapForDB,
    getMovieDetails
}
*/
