using time4movies.Models.Movies;

namespace time4movies.Repository.Movies
{
    public interface IQuoteRepo
    {
        QuoteModel RandomQuote();
    }
}
