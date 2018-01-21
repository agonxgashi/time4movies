using time4movies.Models;

namespace time4movies.Repository.Administration.Interfaces
{
    public interface IAppUserRepo
    {
        bool CreateUser(AppUser user);
        AppUser LogInUser(AppUser user);
        AppUser GetByUsername(string username);
        bool UpdateUser(AppUser user);
        string UpdatePassword(AppUser user, string newPassword);
    }
}
