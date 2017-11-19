using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Repository;
using time4movies.Models;
using time4movies.Models.Movies;

namespace time4movies.Services.Movies
{
    public class QuoteService : Interfaces.IQuoteService
    {
        private Repository.Movies.IQuoteRepo _iqr;
        public QuoteService(Repository.Movies.IQuoteRepo iqr)
        {
            this._iqr = iqr;
        }
        public bool RandomQuote()
        {
            return _iqr.RandomQuote();
        }
    }
}
