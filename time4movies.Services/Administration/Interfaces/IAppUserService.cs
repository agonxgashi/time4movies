using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models;

namespace time4movies.Services.Administration.Interfaces
{
    public interface IAppUserService
    {
        void CreateUser(AppUser user);
        AppUser LogInUser(AppUser user);
    }
}
