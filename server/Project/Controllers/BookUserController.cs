using BLL;
using DAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookUserController : ControllerBase
    {
        public class BorrowRequestDto
        {
            public int UserId { get; set; }
            public int BookId { get; set; }

            public DateTime BorrowDate { get; set; }
            public DateTime ReturnDate { get; set; } 
        }
         private IRepository<User> _userRep;
         private IRepository<Book> _bookRep;
         private IRepository<BookUser> _bookUserRep;

        public BookUserController(IRepository<User> userRep, IRepository<Book> bookRep,IRepository<BookUser> bookUserRep)
        {
            _userRep = userRep;
            _bookRep = bookRep;
            _bookUserRep = bookUserRep;
        }
        [HttpGet("getActive/{userId}")]
        public ActionResult<List<BookUser>> Get(int userId)
        {
            var result = _bookUserRep.GetAll(bu => bu.UserId == userId && bu.Status == BookUserStatus.Active);
            return Ok(result);
        }
        [HttpGet("getActive/{userId}")]
        public ActionResult<List<BookUser>> GetHistory(int userId)
        {
            var result = _bookUserRep.GetAll(bu => bu.UserId == userId);
            return Ok(result);
        }
        [HttpPost]
        public ActionResult<BookUser> AddBook([FromBody] BorrowRequestDto borrow)
        {
            var user = _userRep.GetById(borrow.UserId);
            if (user == null)
                return NotFound("User not found");
            var book = _bookRep.GetById(borrow.BookId);
            if (book == null)
                return NotFound("Book not found");
            if (book.IsActive == false)
            {
                return BadRequest("the book is not aviable");
            }

            var matchingPackageUser = user.PackageUsers
            .Where(pu => pu.Package != null &&
                     pu.Package.CategoryId == book.CategoryId &&
                     pu.RemainingPoints > 0)
             .FirstOrDefault();
            if (matchingPackageUser == null)
                return BadRequest("No available package with points for this book's category.");
            book.IsActive = false;
            _bookRep.Update(book);
            matchingPackageUser.RemainingPoints--;
            if (matchingPackageUser.RemainingPoints < 0)
                matchingPackageUser.IsActive = false;
            var bookUser = new BookUser
            {
                BookId = book.Id,
                UserId = user.Id,
                Status = BookUserStatus.Active,
                IsActiveForUser = true,
                BorrowDate = borrow.BorrowDate,
                ReturnDate = borrow.ReturnDate,
                CanModify = borrow.BorrowDate > DateTime.Now ? true : false,
            };
            user.BooksUser.Add(bookUser);
            _userRep.Update(user);
            return Ok(bookUser);
        }

        [HttpPut("cancel/{userBookId")]
        public ActionResult<BookUser> ChangeStatusToCancle(int bookuserid)
        {
            var bookuser=_bookUserRep.GetById(bookuserid);
            if (bookuser == null) return BadRequest("no exist");
            bookuser.Status = BookUserStatus.Cancelled;
            var bu=_bookUserRep.Update(bookuser);
            if (bu == null) return BadRequest("update fail");
            return Ok(bu);
        }
        [HttpPut("complete/{userBookId")]
        public ActionResult<BookUser> ChangeStatusToComplete(int bookuserid)
        {
            var bookuser = _bookUserRep.GetById(bookuserid);
            if (bookuser == null) return BadRequest("no exist");
            bookuser.Status = BookUserStatus.Completed;
            var bu = _bookUserRep.Update(bookuser);
            if (bu == null) return BadRequest("update fail");
            return Ok(bu);
        }
    }
}
