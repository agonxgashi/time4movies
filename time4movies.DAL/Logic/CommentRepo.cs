using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using time4movies.Models.Logic;

namespace time4movies.Repository.Logic.Interfaces
{
    public class CommentRepo : ICommentRepo
    {
        public bool PostComment(Comment comment)
        {
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Movie.usp_Comment_Insert", con);
                if (comment.ParentId != null)
                    com.Parameters.AddWithValue("@parentId", comment.ParentId);

                com.Parameters.AddWithValue("@movieId" , comment.MovieId);
                com.Parameters.AddWithValue("@userId"  , comment.UserId);
                com.Parameters.AddWithValue("@content" , comment.Content);

                try
                {
                    con.Open();
                    com.ExecuteNonQuery();
                    return true;
                }
                catch (Exception e)
                {
                    Error.AppErrorRepo.InsertError(e, comment.UserId);
                    return false;
                }
            }
            
        }

        public List<Comment> GetByMovieId(int movieId)
        {
            List<Comment> l = new List<Comment>();
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Movie.usp_Comment_GetByMovieId", con);
                com.Parameters.AddWithValue("@movieId", movieId);
                try
                {
                    con.Open();
                    var reader = com.ExecuteReader();
                    while (reader.Read())
                    {
                        var obj = toObject(reader);
                        if (obj != null) l.Add(obj);
                    }
                    
                }
                catch (Exception e)
                {
                    Error.AppErrorRepo.InsertError(e);
                }
            }
            return l;
        }

        public List<Comment> GetByuserId(int userId)
        {
            List<Comment> l = new List<Comment>();
            using (SqlConnection con = new SqlConnection(DbHelper.ConnectionString))
            {
                SqlCommand com = new SqlCommand("Movie.usp_Comment_GetByuserId", con);
                com.Parameters.AddWithValue("@userId", userId);
                try
                {
                    con.Open();
                    var reader = com.ExecuteReader();
                    while (reader.Read())
                    {
                        var obj = toObject(reader);
                        if (obj != null) l.Add(obj);
                    }

                }
                catch (Exception e)
                {
                    Error.AppErrorRepo.InsertError(e);
                }
            }
            return l;
        }

        private Comment toObject(IDataReader r)
        {
            try
            {
                return new Comment()
                {
                    Id         = int.Parse(r["Id"].ToString()),
                    UserId     = int.Parse(r["UserId"].ToString()),
                    MovieId    = int.Parse(r["MovieId"].ToString()),
                    MovieTitle = !String.IsNullOrEmpty(r["Title"].ToString()) ? r["Title"].ToString() : "",
                    Content    = r["Content"].ToString(),
                    ParentId   = int.Parse(r["ParentId"].ToString()),
                    CreateDate = DateTime.Parse(r["CreateDate"].ToString())
                };
            }
            catch (Exception e)
            {
                Error.AppErrorRepo.InsertError(e);
                return null;
            }
        }
    }
}