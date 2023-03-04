const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=537ad33df90139aa68445e562e6ce97b&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=537ad33df90139aa68445e562e6ce97b&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



// get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()


    showMovies(data.results)
}
function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const  {title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
       
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                 <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
             </div>
             <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            `

        main.appendChild(movieEl)
    });

}

function getClassByRate(vote) {
    if(vote >= 8){
        return 'green'
    } else if(vote >=5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form?.addEventListener("submit", (e) => {
    e.preventDefault()


    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''

    } else {
        window.location.reload()
    }
})




//https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80