using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Logic;

namespace time4movies.Repository.Logic.Interfaces
{
    public interface IWatchedRepo
    {
        bool InsertWatched(Watched w);
    }
}
