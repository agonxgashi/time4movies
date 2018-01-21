using time4movies.Models;
using time4movies.Repository.Administration.Interfaces;

namespace time4movies.Services.Administration
{
    public class AppUserService : Interfaces.IAppUserService
    {
        private IAppUserRepo _appUserRepo;

        public AppUserService(IAppUserRepo u)
        {
            this._appUserRepo = u;
        }

        public bool CreateUser(AppUser user)
        {
            return _appUserRepo.CreateUser(user);
        }
            
        public AppUser LogInUser(AppUser user)
        {
            return _appUserRepo.LogInUser(user);
        }

        public AppUser GetByUsername(string username)
        {
            return _appUserRepo.GetByUsername(username);
        }
    }
}
