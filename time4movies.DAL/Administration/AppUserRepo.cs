using System;
using time4movies.Models;
using System.Data;
using System.Data.SqlClient;
using time4movies.Models.Error;

namespace time4movies.Repository.Administration
{
    public class AppUserRepo : Interfaces.IAppUserRepo
    {
        public bool CreateUser(AppUser user)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com  = new SqlCommand("Administration.usp_AppUsers_Insert", con);
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
                catch (Exception e)
                {
                    AppError er = new AppError()
                    {
                        UserId = user.Id,
                        ExceptionMessage = e.Message
                    };
                    Error.AppErrorRepo.InsertError(er);
                    return false;
                }
            }
        }

        public AppUser LogInUser(AppUser user)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com  = new SqlCommand("Administration.usp_AppUser_GetAccount", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@username", user.Username);
                com.Parameters.AddWithValue("@password", user.Password);

                try
                {
                    con.Open();
                    var r = com.ExecuteReader();
                    if (r.Read())
                    {
                        return new AppUser()
                        {
                            FirstName  = r["FirstName"].ToString(),
                            LastName   = r["LastName"].ToString(),
                            Email      = r["Email"].ToString(),
                            Username   = r["Username"].ToString(),
                            UserType   = r["UserType"].ToString(),
                            UserTypeId = int.Parse(r["UserTypeId"].ToString()),
                            Id         = int.Parse(r["Id"].ToString()),
                            CreateDate = DateTime.Parse(r["CreateDate"].ToString()),
                            IsAktiv    = true

                        };
                    }
                }
                catch (Exception e)
                {
                    AppError er = new AppError()
                    {
                        UserId           = user.Id,
                        ExceptionMessage = e.Message
                    };
                    Error.AppErrorRepo.InsertError(er);
                }
            }
            return null;
        }

        public AppUser GetByUsername(string username)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Administration_usp_Profile_GetByUsername", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@username", username);
                

                try
                {
                    con.Open();
                    var r = com.ExecuteReader();
                    if (r.Read())
                    {
                        return new AppUser()
                        {
                            FirstName  = r["FirstName"].ToString(),
                            LastName   = r["LastName"].ToString(),
                            Email      = r["Email"].ToString(),
                            Username   = r["Username"].ToString(),
                            UserType   = r["UserType"].ToString(),
                            Bio        = r["Bio"].ToString(),
                            ProfileQR  = r["ProfileQR"].ToString(),
                            UserTypeId = int.Parse(r["UserTypeId"].ToString()),
                            Id         = int.Parse(r["Id"].ToString()),
                            CreateDate = DateTime.Parse(r["CreateDate"].ToString()),
                            IsAktiv    = true

                        };
                    }
                }
                catch (Exception e)
                {
                    AppError er = new AppError()
                    {
                        UserId           = -1,
                        ExceptionMessage = e.Message
                    };
                    Error.AppErrorRepo.InsertError(er);
                }
            }
            return null;
        }
    }
}
