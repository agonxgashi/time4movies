using Newtonsoft.Json;
using System;
using System.Net.Http;
using time4movies.Models.API;
using time4movies.Models.Movies;
using time4movies.Repository.Error;
using time4movies.Services.Logic.Interfaces;

namespace time4movies.Services.Logic
{
    public class ApiMovieService : IApiMoviesService
    {
        public MovieModel GetMovieById(string movieId)
        {
            MovieModel momvie = new MovieModel();

            try
            {
                HttpClient httpClient = new HttpClient();
                string body = httpClient.GetStringAsync(APIQueries.SearchByMovieId_Query(movieId)).Result;
                momvie = JsonConvert.DeserializeObject<MovieModel>(body);
            }
            catch (Exception ex)
            {
                AppErrorRepo.InsertError(ex);
            }

            return momvie;
        }

        public MoviesListModel GetMoviehByName(string name, int currentUserId)
        {
            MoviesListModel list = new MoviesListModel();

            if (!String.IsNullOrEmpty(name))
            {
                try
                {
                    HttpClient httpClient = new HttpClient();
                    string body = httpClient.GetStringAsync(APIQueries.SearchByName_Query(name)).Result;
                    list = JsonConvert.DeserializeObject<MoviesListModel>(body);
                }
                catch (Exception ex)
                {
                    AppErrorRepo.InsertError(ex);
                }

                //List<TM_Movie> p = ProfileBLL.GetUserWatchedMovies(currentUserId);

                //foreach (TM_Movie wl in p) //Watched List
                //    foreach (var rl in s.Results) //ResultList
                //        if (wl.Id == rl.Id || wl.ImdbId == rl.Id.ToString())
                //            rl.UserDataAboutMovie.IsWatched = true;
            }
            return list;
        }
    }
}
