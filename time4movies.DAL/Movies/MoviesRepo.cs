using System;
using System.Data;
using System.Data.SqlClient;
using time4movies.Models.Logic;

namespace time4movies.Repository.Movies
{
    public class MoviesRepo: IMoviesRepo
    {
        public Watched GetMovie(string imdbMovieId, int userId)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Logic.usp_Watched_GetByUserIdMovieId", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@movieId", imdbMovieId);
                com.Parameters.AddWithValue("@userId", userId);

                try
                {
                    con.Open();
                    var r = com.ExecuteReader();
                    if (r.Read())
                    {
                        return new Watched()
                        {
                            UserId      = userId,
                            MovieId     = imdbMovieId,
                            DateCreated = DateTime.Parse(r["DateCreated"].ToString())

                        };
                    }
                }
                catch (Exception e)
                {
                    return null;
                }
            }
            return null;
        }
    }
}