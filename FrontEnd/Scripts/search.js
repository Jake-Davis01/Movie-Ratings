//import {mapForDB, getMovieDetails} from "FrontEnd/app.js"

// capture where the search values
// put them into an api request from OMDB
//results need to be made into json and array
//nodelist and make elements fro each one

// search dvi will be called

const searchForm = document.querySelector("#user-search");
const searchInput = document.querySelector("#movie-form");
const searchDiv = document.querySelector("#search-results");
const searchPrompt = document.querySelector("#search-prompt");

let currentPage = 1;
let currentSearchTerm = "";
let currentSearchYear = "";
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

/*

// separate the movie element creation for load more feature
async function renderCards(movieArray) {
  // remove exisitng load more
  const existingLoadMore = document.querySelector(".load-more-button");
  if (existingLoadMore) {
    existingLoadMore.remove();
  }

  movieArray.Search.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("search-card");
    card.dataset.imdbid = movie.imdbID;

    const img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = movie.Title;
    img.onerror = () => (img.style.display = "none");

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.Title;

    const myear = document.createElement("p");
    myear.textContent = movie.Year;

    card.appendChild(img);
    card.appendChild(movieTitle);
    card.appendChild(myear);

    searchDiv.appendChild(card);
  });

  // get the niche ones
  const loadMore = document.createElement("button");
  loadMore.textContent = "More...";
  loadMore.classList.add("load-more-button");

  loadMore.addEventListener("click", async () => {
    currentPage += 1;
    const moreMovies = await getMovieDetails(
      currentSearchTerm,
      currentPage,
      currentSearchYear,
    );
    renderCards(moreMovies);
  });

  searchDiv.appendChild(loadMore);
}

const addForm = document.querySelector("#add-section form");
addForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  searchDiv.innerHTML = "";
  currentPage = 1;
  currentSearchTerm = document.querySelector("#mTitle").value;
  currentSearchYear = document.querySelector("#mYear").value;

  const title = document.querySelector("#mTitle").value;
  const year = document.querySelector("#mYear").value;
  const rating = document.querySelector("#rating").value;

  console.log(title, year, rating);

  const movieSearchList = await getMovieDetails(title, currentPage, year);
  console.log(movieSearchList);

  renderCards(movieSearchList);
  event.target.reset();
});

//event listener on click to get selectedMovie

searchDiv.addEventListener("click", async (event) => {
  const card = event.target.closest(".search-card");

  if (!card) {
    return;
  }

  const imdbID = card.dataset.imdbID;
  const title = card.querySelector("h3").textContent;

  const movieResults = await selectMovie(imdbID);
  console.log(movieResults);
  return movieResults;
});
*/

// song stuff

async function renderCards(songs) {
  // remove exisitng load more
  const existingLoadMore = document.querySelector(".load-more-button");
  if (existingLoadMore) {
    existingLoadMore.remove();
  }

  songs.trackmatches.track.forEach((song) => {
    const card = document.createElement("div");
    card.classList.add("search-card");
    card.dataset.trackName = song.name;
    card.dataset.artistName = song.artist;

    const img = document.createElement("img");
    img.src = song.image[2]["#text"];
    img.alt = song.name;
    img.onerror = () => (img.style.display = "none");

    const title = document.createElement("h3");
    title.textContent = song.name;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(artist);

    searchDiv.appendChild(card);
  });

  // get the niche ones
  const loadMore = document.createElement("button");
  loadMore.textContent = "More...";
  loadMore.classList.add("load-more-button");

  loadMore.addEventListener("click", async () => {
    currentPage += 1;
    const moreSongs = await searchSong(currentSearchTerm, currentPage);
    renderCards(moreSongs);
  });

  searchDiv.appendChild(loadMore);
}

const addForm = document.querySelector("#add-section form");
addForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  searchDiv.innerHTML = "";
  currentPage = 1;
  currentSearchTerm = document.querySelector("#mTitle").value;
  currentSearchYear = document.querySelector("#mYear").value;

  const title = document.querySelector("#mTitle").value;
  const year = document.querySelector("#mYear").value;
  const rating = document.querySelector("#rating").value;

  console.log(title, year, rating);

  const songSearchList = await searchSong(title, currentPage);
  console.log(songSearchList);

  renderCards(songSearchList);
  event.target.reset();
});
