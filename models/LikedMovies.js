const youtubeLink = "https://www.youtube.com/watch?v="
const getVideo = "https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=53dacffc2f103e940b4c0818932bc4c2&language=en-US";
const whereToWatch = "https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=%24%7Bkey%7D"
const topRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=%24%7Bkey%7D&language=en-US&page=1"
const nowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=%24%7Bkey%7D&language=en-US&page=1"