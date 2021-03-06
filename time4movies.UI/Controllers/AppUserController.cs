﻿using Microsoft.AspNetCore.Mvc;
using time4movies.Services.Administration.Interfaces;
using time4movies.Models;
using time4movies.UI.Auth;

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

        [HttpPost("[action]")]
        public string LogInUser([FromBody]AppUser user)
        {
            AppUser usr = _appUserService.LogInUser(user);
            return usr != null ? TokenGenerator.Build(usr) : ""; 
        }

        [HttpGet("[action]")]
        public AppUser ByUsername(string username)
        {
            return _appUserService.GetByUsername(username);
        }

        [HttpPost("[action]")]
        public bool UpdateUser([FromBody]AppUser user)
        {
            return _appUserService.UpdateUser(user);
        }

        [HttpPost("[action]")]
        public string UpdatePassword([FromBody]AppUser user)
        {
            return _appUserService.UpdatePassword(user, user.NewPassword);
        }

    }
}