using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Logic;

namespace time4movies.Services.Logic.Interfaces
{
    public interface IWatchedService
    {
        bool InsertWatched(Watched w);
    }
}
