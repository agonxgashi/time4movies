﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using time4movies.Models.Logic;
using time4movies.Services.Logic.Interfaces;

namespace time4movies.UI.Controllers
{
    [Produces("application/json")]
    [Route("api/Logic")] 
    public class LogicController : Controller
    {
        private IWatchedService _watched;

        public LogicController(IWatchedService watched)
        {
            _watched = watched;
        }

        [HttpGet("[action]")]
        public bool RandomQuote(Watched w)
        {
            return _watched.InsertWatched(w); 
        }
    }
}