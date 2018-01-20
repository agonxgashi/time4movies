using System.Collections.Generic;
using time4movies.Models.Logic;

namespace time4movies.Services.Logic.Interfaces
{
    public interface ICommentService
    {
        bool PostComment(Comment comment);
        List<Comment> GetByMovieId(int movieId);
        List<Comment> GetByuserId(int userId);
    }
}