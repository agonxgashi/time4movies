using System.Data.SqlClient;
using System.Data;
using time4movies.Models.Movies;

namespace time4movies.Repository.Movies
{
    public class QuoteRepo : IQuoteRepo
    {
        public QuoteModel RandomQuote()
        {
           using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
           {              
                SqlCommand com = new SqlCommand("Movie.usp_Quotes_GetQuotes", con);
                com.CommandType = CommandType.StoredProcedure;

                try
                {
                    con.Open();
                    var r = com.ExecuteReader();

                    if (r.Read())
                    {
                        return new QuoteModel()
                        {
                            Author = r["Author"].ToString(),
                            Quote = r["Quote"].ToString()
                        };
                    }
                }
                catch (System.Exception e)
                {
                    Error.AppErrorRepo.InsertError(new Models.Error.AppError()
                    {
                        ExceptionMessage = e.Message.ToString()
                    });
                }
                return new QuoteModel();
           }
        }
    }
}

