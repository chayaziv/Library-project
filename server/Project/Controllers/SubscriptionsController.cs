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
    public class SubscriptionsController : ControllerBase
    {
        private IRepository<Subscriptions> SubscriptionsRepository;



        
        //[HttpGet("get")]
        //public IActionResult GetAll()
        //{
        //    List<Subscriptions> c = SubscriptionsRepository.GetAll();
        //    if (c == null)
        //        return NotFound("Dont have any ClientDTO");//מחזיר404  אין לקוחות
        //    return Ok(c);   //202עם רשימת הלקוחות


        //}
        
        public SubscriptionsController(IRepository<Subscriptions> SubscriptionsRepository)
        {
            this.SubscriptionsRepository = SubscriptionsRepository;
        }
        [HttpPost("getUser")]
        public IActionResult GetBookById(Subscriptions s)
        {
            Subscriptions b = SubscriptionsRepository.GetBy(s);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<Subscriptions> AddBook(Subscriptions b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();

            Subscriptions Subscriptions = SubscriptionsRepository.GetById(b.UserCode );
            if (Subscriptions != null)
                return BadRequest("try to add exist subscription");
            SubscriptionsRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.UserCode  }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id, Subscriptions b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.UserCode )
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.UserCode  }, SubscriptionsRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            Subscriptions Subscriptions = SubscriptionsRepository.GetById(id);
            if (Subscriptions == null)
            {
                return NotFound();
            }

            SubscriptionsRepository.Delete(Subscriptions);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<Subscriptions> s = SubscriptionsRepository.GetAll();
            if (s == null)
                return NotFound("Dont have any Subscriptions");
            return Ok(s);
        }
    }
}
