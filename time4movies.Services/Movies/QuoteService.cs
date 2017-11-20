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
        public QuoteModel RandomQuote()
        {
            return _iqr.RandomQuote();
        }
    }
}
