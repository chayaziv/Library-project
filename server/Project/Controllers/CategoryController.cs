using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category> CategoryRepository;

        public CategoryController(IRepository<Category> CategoryRepository)
        {
            this.CategoryRepository = CategoryRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            Category b = CategoryRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<Category> AddCategory([FromBody] Category b)
        {
            if (b == null)
                return BadRequest();

            Category Category = CategoryRepository.GetById(b.Id);
            if (Category != null)

                return BadRequest("try to add exist category");
            CategoryRepository.Add(b);
            return CreatedAtAction(nameof(AddCategory), new { id = b.Id }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id,[FromBody] Category b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.Id)
                return Conflict();
            return CreatedAtAction(nameof(AddCategory), new { id = b.Id }, CategoryRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            Category Category = CategoryRepository.GetById(id);
            if (Category == null)
            {
                return NotFound();
            }

            CategoryRepository.Delete(Category);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<Category> c = CategoryRepository.GetAll();
            if (c == null)
                return NotFound("Dont have any Category");
            return Ok(c);
        }
    }
}
