using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using time4movies.Models;
using time4movies.Models.Error;
using time4movies.Models.Movies;

namespace time4movies.Repository.Movies
{
    public class QuoteRepo : IQuoteRepo
    {
        public bool RandomQuote()
        {
           using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
           {
                    Quote quote = new Quote();
                    SqlCommand com = new SqlCommand("Movie.usp_Quotes_GetQuotes", con);
                    com.CommandType = CommandType.StoredProcedure;
                    
                    con.Open();
                    using (SqlDataReader dr = com.ExecuteReader())
                    {
                        
                        while (dr.Read())
                        {
                        
                        quote.Quotes = dr["Quote"].ToString();
                        quote.Author = dr["Author"].ToString();
                    }
                    }
                    com.ExecuteNonQuery();
                    return true;
           }
        }
    }
}

