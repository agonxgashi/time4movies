using System;
using System.Data.SqlClient;
using time4movies.Models.Error;

namespace time4movies.Repository.Error
{
    public class AppErrorRepo
    {
        public static void InsertError(AppError error)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Error.usp_AppErrors_Insert", con);
                com.CommandType = System.Data.CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@ExceptionMessage", error.ExceptionMessage);
                if (error.UserId != null)
                    com.Parameters.AddWithValue("@UserId", error.UserId);

                try
                {
                    con.Open();
                    com.ExecuteNonQuery();
                }
                catch (Exception)
                {
                }

            }
        }

        public static void InsertError(Exception error, int userId = -1)
        {
            AppError e         = new AppError();
            e.ExceptionMessage = error.Message;
            e.UserId           = userId;
            InsertError(e);
        }
    }
}
