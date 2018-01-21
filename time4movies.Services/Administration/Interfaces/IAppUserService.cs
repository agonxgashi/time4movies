using time4movies.Models;

namespace time4movies.Services.Administration.Interfaces
{
    public interface IAppUserService
    {
        bool CreateUser(AppUser user);
        AppUser LogInUser(AppUser user);
        AppUser GetByUsername(string username);
    }
}
