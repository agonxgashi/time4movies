using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Logic;
using time4movies.Repository.Logic.Interfaces;

namespace time4movies.Services.Logic
{
    public class WatchedService : Interfaces.IWatchedService
    {
        private IWatchedRepo _r;

        public WatchedService(IWatchedRepo r)
        {
            this._r = r;
        }

        public bool InsertWatched(Watched w)
        {
            return _r.InsertWatched(w);
        }
    }
}
