using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;
using DTO;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class BooksController : ControllerBase
    {
        private IRepository<BooksDTO> booksRepository;

        public BooksController(IRepository<BooksDTO> booksRepository)
        {
            this.booksRepository = booksRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetBookById(int id)
        {
            BooksDTO b = booksRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<BooksDTO> AddBook(BooksDTO b)
        {
            if (b == null || ModelState.IsValid)
                return BadRequest();

            BooksDTO booksDTO = booksRepository.GetById(b.BookCode);
            if (booksDTO != null)

                return BadRequest("try to add exist book");
            booksRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.BookCode }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id, BooksDTO b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.BookCode)
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.BookCode }, booksRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            BooksDTO booksDTO = booksRepository.GetById(id);
            if (booksDTO == null)
            {
                return NotFound();
            }

            booksRepository.Delete(booksDTO);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<BooksDTO> b = booksRepository.GetAll();
            if (b == null)
                return NotFound("Dont have any BooksDTO");
            return Ok(b);
        }
    }
}
