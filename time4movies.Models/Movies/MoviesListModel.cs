using time4movies.Models.API;

namespace time4movies.Models.Movies
{
    public class MoviesListModel
    {
        public int page { get; set; }
        public int total_results { get; set; }
        public int total_pages { get; set; }
        public BaseMovieModel[] results { get; set; }
    }

    public class BaseMovieModel
    {
        public int vote_count { get; set; }
        public int id { get; set; }
        public bool video { get; set; }
        public float vote_average { get; set; }
        public string title { get; set; }
        public float popularity { get; set; }
        public string poster_path { get; set; }
        public string original_language { get; set; }
        public string original_title { get; set; }
        public int?[] genre_ids { get; set; }
        public string backdrop_path { get; set; }
        public bool adult { get; set; }
        public string overview { get; set; }
        public string release_date { get; set; }

        public string FullPath
        {
            get { return ApiHelper.PathBackdrop + this.poster_path; };
        }
    }

}
