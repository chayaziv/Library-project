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
    public class PackageController : ControllerBase
    {
        private IRepository<Package> PackageRepository;

        public PackageController(IRepository<Package> PackageRepository)
        {
            this.PackageRepository = PackageRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetBookById(int id)
        {
            Package b = PackageRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<Package> AddBook(Package b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest("bbbbbbbb");

            Package Package = PackageRepository.GetById(b.Id);
            if (Package != null)

                return BadRequest("try to add exist book");
            PackageRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.Id }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id, Package b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.Id)
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.Id }, PackageRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            Package Package = PackageRepository.GetById(id);
            if (Package == null)
            {
                return NotFound();
            }

            PackageRepository.Delete(Package);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<Package> p = PackageRepository.GetAll();
            if(p==null)
                return NotFound("Dont have any package");
            return Ok(p);
        }
    }
}
