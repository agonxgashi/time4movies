using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models
{
    public class AppUser
    {
        public int Id              { get; set; }
        public string FirstName    { get; set; }
        public string LastName     { get; set; }
        public string Username     { get; set; }
        public string Email        { get; set; }
        public string Password     { get; set; }
        public int UserTypeId      { get; set; }
        public string UserType     { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsAktiv        { get; set; }
    }
}
