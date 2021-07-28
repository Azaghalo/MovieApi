const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=05a92662981d7608e942b6449247b434&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_URL =
	'https://api.themoviedb.org/3/search/movie?api_key=05a92662981d7608e942b6449247b434&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL);

async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();

	showMovies(data.results);
}

function showMovies(data) {
	main.innerHTML = '';

	data.forEach((movie) => {
		const { title, poster_path, vote_average, overview, release_date } = movie;

		if (poster_path === null) {
		}

		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');

		movieEl.innerHTML = `

            <div class="movie-img-wrapper">
            
                <img src="${posterCheck(poster_path)}" alt="${title}"/>

                <div class="overview">

                    <h3>${title}
                        <span class="movie-date">
                            (${getMovieYear(release_date)})
                        </span>
                    </h3>

                    ${overview}
            
                </div>
            
            </div>

            <div class="movie-info">
                <h3>${title}</h3>
                <span class=${getRatingColor(vote_average)}>
                    ${vote_average}
                </span>
            </div>
        `;
		main.appendChild(movieEl);
	});
}

function getMovieYear(date) {
	if (date === null || date === '' || date === undefined) {
		return '?????';
	}
	newdate = date.split('-');
	return newdate[0];
}

function posterCheck(poster_path) {
	if (poster_path === null) {
		return './Images/placeHolder.svg';
	} else {
		return IMG_PATH + poster_path;
	}
}

function getRatingColor(vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searcTerm = search.value;

	if (searcTerm && searcTerm !== '') {
		getMovies(SEARCH_URL + searcTerm);

		search.value = '';
	} else {
		window.location.reload();
	}
});
