using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using time4movies.Models.Logic;
using time4movies.Services.Logic.Interfaces;

namespace time4movies.UI.Controllers
{
    [Produces("application/json")]
    [Route("api/Comment")]
    public class CommentController : Controller
    {
        private readonly ICommentService _cs;
        public CommentController(ICommentService cs){ _cs = cs; }

        [HttpPost("[action]")]
        public bool Post([FromBody]Comment comment)
        {
            return _cs.PostComment(comment);
        }

        [HttpGet("[action]")]
        public List<Comment> ByMovie(int movieId)
        {
            return _cs.GetByMovieId(movieId);
        }

        [HttpGet("[action]")]
        public List<Comment> ByUser(int userId)
        {
            return _cs.GetByuserId(userId);
        }
    }
}