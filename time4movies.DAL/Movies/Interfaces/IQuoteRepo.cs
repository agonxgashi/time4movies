using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models;

namespace time4movies.Repository.Movies
{
    public interface IQuoteRepo
    {
        bool RandomQuote();
    }
}
