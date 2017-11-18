using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models.Error
{
    public class AppError
    {
        public int Id { get; set; }
        public string ExceptionMessage { get; set; }
        public int? UserId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
