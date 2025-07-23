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
        public IActionResult GetPackageById(int id)
        {
            Package b = PackageRepository.GetById(id);
            if (b == null)
                return NotFound("the Package isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<Package> AddPackage([FromBody]Package b)
        {
            if (b == null)
                return BadRequest("is null");

            Package Package = PackageRepository.GetById(b.Id);
            if (Package != null)
                return BadRequest("try to add exist Package");
            PackageRepository.Add(b);
            return CreatedAtAction(nameof(AddPackage), new { id = b.Id }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdatePackage(int id,[FromBody] Package b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.Id)
                return Conflict();
            return CreatedAtAction(nameof(AddPackage), new { id = b.Id }, PackageRepository.Update(b));
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
        public ActionResult<List<Package>> GetAll()
        {
            List<Package> p = PackageRepository.GetAll();
            if(p==null)
                return NotFound("Dont have any package");
            return Ok(p);
        }
    }
}
