using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;


namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class BooksController : ControllerBase
    {
        private IRepository<Book> booksRepository;

        public BooksController(IRepository<Book> booksRepository)
        {
            this.booksRepository = booksRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetBookById(int id)
        {
            Book b = booksRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<Book> AddBook([FromBody]Book b)
        {
            if (b == null)
                return BadRequest();

            Book Book = booksRepository.GetById(b.Id);
            if (Book != null)

                return BadRequest("try to add exist book");
            booksRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.Id }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id,[FromBody] Book b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.Id)
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.Id }, booksRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            Book Book = booksRepository.GetById(id);
            if (Book == null)
            {
                return NotFound();
            }

            booksRepository.Delete(Book);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<Book> b = booksRepository.GetAll();
            if (b == null)
                return NotFound("Dont have any Book");
            return Ok(b);
        }
    }
}
