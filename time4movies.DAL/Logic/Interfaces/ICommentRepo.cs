using System.Collections.Generic;
using time4movies.Models.Logic;

namespace time4movies.Repository.Logic.Interfaces
{
    public interface ICommentRepo
    {
        bool PostComment(Comment comment);
        List<Comment> GetByMovieId(int movieId);
    }
}