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
    public class UserController : ControllerBase
    {
        private IRepository<User> UserRepository;        
        public UserController(IRepository<User> UserRepository)
        {
            this.UserRepository = UserRepository;
        }
        [HttpPost("getUser")]
        public IActionResult GetBookById(User s)
        {
            User b = UserRepository.GetBy(s);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<User> AddBook(User b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();

            User User = UserRepository.GetById(b.Id );
            if (User != null)
                return BadRequest("try to add exist subscription");
            UserRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.Id  }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id, User b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.Id )
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.Id  }, UserRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            User User = UserRepository.GetById(id);
            if (User == null)
            {
                return NotFound();
            }

            UserRepository.Delete(User);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<User> s = UserRepository.GetAll();
            if (s == null)
                return NotFound("Dont have any User");
            return Ok(s);
        }
    }
}
