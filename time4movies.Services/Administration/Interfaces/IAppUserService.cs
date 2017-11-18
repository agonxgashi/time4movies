using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models;

namespace time4movies.Services.Administration.Interfaces
{
    public interface IAppUserService
    {
        bool CreateUser(AppUser user);
    }
}
