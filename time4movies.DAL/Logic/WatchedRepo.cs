using System;
using System.Data.SqlClient;
using time4movies.Models.Error;
using time4movies.Models.Logic;

namespace time4movies.Repository.Logic.Interfaces
{
    public class WatchedRepo : Interfaces.IWatchedRepo
    {


        public bool InsertWatched(Watched w)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com  = new SqlCommand("Logic.usp_Watched_Insert", con);
                com.CommandType = System.Data.CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@UserId" , w.UserId);
                com.Parameters.AddWithValue("@MovieId", w.MovieId);

                try
                {
                    con.Open();
                    com.ExecuteNonQuery();
                    return true;
                }
                catch (Exception e)
                {
                    Error.AppErrorRepo.InsertError(e, w.UserId);
                    return false;
                }
            }
        }
    }
}
