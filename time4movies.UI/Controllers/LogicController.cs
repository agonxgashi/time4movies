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

        [HttpPost("[action]")]
        public bool InsertWatched([FromBody]Watched watched)
        {
            return _watched.InsertWatched(watched); 
        }

        [HttpPost("[action]")]
        public bool RemoveWatched([FromBody]Watched watched)
        {
            return _watched.RemoveWatched(watched);
        }
    }
}