using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using time4movies.Services.Administration.Interfaces;
using time4movies.Models;
using time4movies.UI.Auth;

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

        [HttpPost("[action]")]
        public void RandomQuote()
        {
            this._iqr.RandomQuote();
        }
    }
}