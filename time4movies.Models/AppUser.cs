using System;
using System.Collections.Generic;
using System.Text;

namespace time4movies.Models
{
    class AppUser
    {
        public int Id              { get; set; }
        public string FirstName    { get; set; }
        public string LastName     { get; set; }
        public string Username     { get; set; }
        public string Email        { get; set; }
        public string Password     { get; set; }
        public UserType UserTypeId { get; set; }
        public UserType UserType   { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsAktiv        { get; set; }
    }
}
