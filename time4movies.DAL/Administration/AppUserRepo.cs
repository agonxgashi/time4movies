﻿using System;
using time4movies.Models;
using System.Data;
using time4movies.Repository.Administration.Interfaces;
using System.Data.SqlClient;

namespace time4movies.Repository.Administration
{
    public class AppUserRepo : Interfaces.IAppUserRepo
    {
        public bool CreateUser(AppUser user)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Administration.usp_AppUsers_Insert", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@FirstName"  , user.FirstName);
                com.Parameters.AddWithValue("@LastName"   , user.LastName);
                com.Parameters.AddWithValue("@Username"   , user.Username);
                com.Parameters.AddWithValue("@Email"      , user.Email);
                com.Parameters.AddWithValue("@AccPassword", user.Password);

                try
                {
                    con.Open();
                    com.ExecuteNonQuery();
                    return true;
                }
                catch (Exception e) { return false; }
            }
        }

        void IAppUserRepo.CreateUser(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}
