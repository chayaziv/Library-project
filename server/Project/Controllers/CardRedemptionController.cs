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
    public class CardRedemptionController : ControllerBase
    {
        private IRepository<CardRedemption> CardRedemptionRepository;

        public CardRedemptionController(IRepository<CardRedemption> CardRedemptionRepository)
        {
            this.CardRedemptionRepository = CardRedemptionRepository;
        }
        [HttpGet("get/{id}")]
        public IActionResult GetBookById(int id)
        {
            CardRedemption b = CardRedemptionRepository.GetById(id);
            if (b == null)
                return NotFound("the book isnot found");//404
            return Ok(b);//200
        }
        [HttpPost("add")]
        public ActionResult<CardRedemption> AddCardRedemption(CardRedemption b)
        {
            if (b == null || ModelState.IsValid)
                return BadRequest();

            CardRedemption CardRedemption = CardRedemptionRepository.GetById(b.QuestionCode);
            if (CardRedemption != null)

                return BadRequest("try to add exist book");
            CardRedemptionRepository.Add(b);
            return CreatedAtAction(nameof(AddCardRedemption), new { id = b.QuestionCode }, b);


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateCardRedemption(int id, CardRedemption b)
        {
            if (b == null || !ModelState.IsValid)
                return BadRequest();
            if (id != b.QuestionCode)
                return Conflict();
            return CreatedAtAction(nameof(AddCardRedemption), new { id = b.QuestionCode }, CardRedemptionRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            CardRedemption CardRedemption = CardRedemptionRepository.GetById(id);
            if (CardRedemption == null)
            {
                return NotFound();
            }

            CardRedemptionRepository.Delete(CardRedemption);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<CardRedemption> p = CardRedemptionRepository.GetAll();
            if (p == null)
                return NotFound("Dont have any CardRedemption");
            return Ok(p);
        }
    }
}
