using System.Collections.Generic;
using time4movies.Models.Logic;
using time4movies.Repository.Logic.Interfaces;
using time4movies.Services.Logic.Interfaces;

namespace time4movies.Services.Logic
{
    public class CommentService:ICommentService
    {
        private readonly ICommentRepo _r;

        public CommentService(ICommentRepo r)
        {
            _r = r;
        }

        public bool PostComment(Comment comment)
        {
            return _r.PostComment(comment);
        }

        public List<Comment> GetByMovieId(int movieId)
        {
            return _r.GetByMovieId(movieId);
        }

        public List<Comment> GetByuserId(int userId)
        {
            return _r.GetByuserId(userId);
        }
    }
}