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
            public DateTime ReturnDate { get; set; } // Nullable, in case return hasn't happened yet
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
        [HttpGet("{userId}/getActive")]
        public ActionResult<List<BookUser>> Get(int userId)
        {
            var result = _bookUserRep.GetAll(bu => bu.UserId == userId && bu.Status == BookUserStatus.Active);
            return Ok(result);
        }
        [HttpGet("{userId}/history")]
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
        // GET: api/<BookUserController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<BookUserController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<BookUserController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<BookUserController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<BookUserController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
