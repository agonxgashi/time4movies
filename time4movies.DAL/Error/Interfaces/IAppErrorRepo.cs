using System;
using System.Collections.Generic;
using System.Text;
using time4movies.Models.Error;

namespace time4movies.Repository.Error.Interfaces
{
    public interface IAppErrorRepo
    {
        void InsertError(AppError error);
    }
}
