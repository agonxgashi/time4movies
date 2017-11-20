using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models.Movies
{
    public class QuoteModel
    {
        public int Id { get; set; }
        public string Quote { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
