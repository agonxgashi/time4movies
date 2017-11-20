using Microsoft.AspNetCore.Mvc;
using time4movies.Models.Movies;

namespace time4movies.UI.Controllers
{
    [Produces("application/json")]
    [Route("api/Quote")]
    public class QuoteController : Controller
    {
        private time4movies.Services.Movies.Interfaces.IQuoteService _iqr;
        public QuoteController(time4movies.Services.Movies.Interfaces.IQuoteService iqr)
        {
            this._iqr = iqr;

        }

        [HttpGet("[action]")]
        public QuoteModel RandomQuote()
        {
            return this._iqr.RandomQuote();
        }
    }
}