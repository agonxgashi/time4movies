using System;
using System.ComponentModel;

namespace time4movies.Models.Logic
{
    public class Comment
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int MovieId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}