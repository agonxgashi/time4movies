﻿using System;

namespace time4movies.Models.Logic
{
    public class Watched
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string MovieId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
