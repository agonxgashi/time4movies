using Microsoft.AspNetCore.Mvc;
using time4movies.Services.Administration.Interfaces;
using time4movies.Models;

namespace time4movies.UI.Controllers
{
    [Produces("application/json")]
    [Route("api/AppUser")]
    public class AppUserController : Controller
    {

        private IAppUserService _appUserService;

        public AppUserController(IAppUserService u)
        {
            this._appUserService = u;
        }

        [HttpPost("[action]")]
        public void CreateUser([FromBody]AppUser user)
        {
            this._appUserService.CreateUser(user);
        }

    }
}