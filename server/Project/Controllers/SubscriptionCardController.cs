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
    public class SubscriptionCardController : ControllerBase
    {
        private IRepository<SubscriptionCard> SubscriptionCardRepository;






        public SubscriptionCardController(IRepository<SubscriptionCard> SubscriptionCardRepository)
        {
            this.SubscriptionCardRepository = SubscriptionCardRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetBookById(int id)
        {
            SubscriptionCard b = SubscriptionCardRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<SubscriptionCard> AddBook(SubscriptionCard b)
        {
            if (b == null || ModelState.IsValid)
                return BadRequest();

            SubscriptionCard SubscriptionCard = SubscriptionCardRepository.GetById(b.PurchaseCode);
            if (SubscriptionCard != null)

                return BadRequest("try to add exist book");
            SubscriptionCardRepository.Add(b);
            return CreatedAtAction(nameof(AddBook), new { id = b.PurchaseCode }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateBook(int id, SubscriptionCard b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.PurchaseCode)
                return Conflict();
            return CreatedAtAction(nameof(AddBook), new { id = b.PurchaseCode }, SubscriptionCardRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            SubscriptionCard SubscriptionCard = SubscriptionCardRepository.GetById(id);
            if (SubscriptionCard == null)
            {
                return NotFound();
            }

            SubscriptionCardRepository.Delete(SubscriptionCard);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<SubscriptionCard> s = SubscriptionCardRepository.GetAll();
            if (s == null)
                return NotFound("Dont have any SubscriptionCard");
            return Ok(s);
        }


    }

}
