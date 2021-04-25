

// selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesUpcoming = document.querySelector('#movies-upcoming');
const moviesTop = document.querySelector('#movies-top');
const moviesPopular = document.querySelector('#movies-popular');

function movieSection(movies){
    return movies.map((movie) =>{
        if(movie.poster_path){
            return ` 
                <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${ movie.id }/>
            `;
        }
        
    })
}
//creating the movie html
function createMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p class="text-2xl" id="content-close"></p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;

}
function renderSearchMovies(data){
    //data results[]
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);
}
function renderMoviesUpcoming(data){
    //data results[]
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesUpcoming.appendChild(movieBlock);
}
function renderMoviesTop(data){
    //data results[]
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesTop.appendChild(movieBlock);
}
function renderMoviesPopular(data){
    //data results[]
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesPopular.appendChild(movieBlock);
}
function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://youtube.com/embed/${video.key}`
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;

}
function handleError(){
    console.log('Error: ', error);
}
//onclick event (search feature)
buttonElement.onclick = function(event){
    event.preventDefault();//changing the default browser behaviour
    const value = inputElement.value;//storing the inputElement value in a variable
    searchMovie(value);
    
    inputElement.value = '';
    console.log('Value: ', value);//outputting the value to the console
}
function createVideoTemplate(data, content){
    //Display movie videos
    console.log('videos: ', data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    if (videos.length >= 1){
        content.innerHTML = `<p class="text-center p-4 bg-gray-800 text-white text-2xl m-10 border rounded-lg" id="content-close">Available Movie Trailers</p>`;
        for (let i = 0; i < videos.length; i++){
            const video = videos[i]; //video
            const iframe = createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);
        }
    }
    else if (videos.length === 0){
        content.innerHTML = '<p class="text-center text-black text-4xl m-10" id="content-close">No Movie trailer</p>';
 
    }
    
}
//event delegation
document.onclick = function(event){
    
    const target = event.target;

    if(target.tagName.toLowerCase() === 'img'){
        console.log(event);
        const section = event.target.parentElement;//content
        const content = section.nextElementSibling;//sibling
        const movieId = target.dataset.movieId;
        console.log(movieId);
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);

        //fetch movie videos
        fetch(url)
            .then((res)=> res.json())//response form the http request getting stored in a json
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);//catching and displaying any errors
        });
    }
    if(target.id === 'content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
    
}
    
getUpcomingMovies();
getTopratedMovies();
getPopularMovies();



