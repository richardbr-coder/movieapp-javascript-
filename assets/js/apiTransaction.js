//Initial values
const API_KEY = '893b8068cf3ebfcf8d8ba8d88639236a'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=893b8068cf3ebfcf8d8ba8d88639236a'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=893b8068cf3ebfcf8d8ba8d88639236a`
    return url;
}
function requestMovies(url, onCopmplete, onError){
    fetch(url)//getting the url
    .then((res)=> res.json())//response form the http request getting stored in a json
    .then(onCopmplete)
    .catch(onError);
    
}
function searchMovie(value){
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url,renderSearchMovies,handleError);
}
function getUpcomingMovies(value){
    

    const path = '/movie/upcoming';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url,renderMoviesUpcoming,handleError);
}
function getTopratedMovies(value){
    const path = '/movie/top_rated';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url,renderMoviesTop,handleError);
}
function getPopularMovies(value){
    const path = '/movie/popular';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url,renderMoviesPopular,handleError);
}